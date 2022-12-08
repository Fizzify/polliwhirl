import { signIn } from "next-auth/react";
import Image from "next/image";

interface IProviderButton {
  provider: string;
}

const ProviderButton = ({ provider }: IProviderButton) => {
  const capitalizeProviderNameFirstLetter = (provider: string) => {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  };

  const capitalizedProviderName = capitalizeProviderNameFirstLetter(provider);

  return (
    <button
      className="flex h-12 w-full items-center justify-center rounded-full bg-primaryBlue text-xl font-semibold text-black transition hover:bg-secondaryBlue hover:text-black "
      onClick={() => signIn(provider)}
    >
      <Image
        src={`/providers/${provider}.svg`}
        alt={`${capitalizedProviderName} logo`}
        className="mr-2 h-6 w-6"
        width={6}
        height={6}
      />
      Sign in with {capitalizedProviderName}
    </button>
  );
};

export default ProviderButton;
