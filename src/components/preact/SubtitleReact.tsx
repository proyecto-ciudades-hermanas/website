interface SubtitleProps {
  text: string;
}

export const SubtitleReact = ({ text }: SubtitleProps) => {
  return (
    <h2 className="text-center text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl mb-10">
      {text}
    </h2>
  );
};
