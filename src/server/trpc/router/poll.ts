import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";

export const pollRouter = router({
  getPolls: protectedProcedure.query(async ({ ctx }) => {
    const polls = await ctx.prisma.poll.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return { polls };
  }),
  createPoll: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        options: z.array(z.object({ name: z.string() })),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const poll = await ctx.prisma.poll.create({
        data: {
          question: input.question,
          options: {
            create: input.options.map((option) => ({
              name: option.name,
            })),
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return { poll };
    }),
  getPoll: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const poll = await ctx.prisma.poll.findUnique({
      where: {
        id: input,
      },
    });

    return { poll };
  }),
  getOptionsFromPoll: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const options = await ctx.prisma.option.findMany({
        where: {
          pollId: input,
        },
      });

      return { options };
    }),
  voteOption: publicProcedure
    .input(z.object({ pollId: z.string(), optionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const option = await ctx.prisma.option.update({
        where: {
          id: input.optionId,
        },
        data: {
          votes: {
            increment: 1,
          },
        },
      });

      const poll = await ctx.prisma.poll.update({
        where: {
          id: input.pollId,
        },
        data: {
          voted: {
            push: ctx.session?.user?.id,
          },
        },
      });

      return { option };
    }),
  deletePoll: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const poll = await ctx.prisma.poll.delete({
        where: {
          id: input,
        },
      });

      return { poll };
    }),
});
