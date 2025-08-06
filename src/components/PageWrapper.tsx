interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`pt-6 px-6 pb-6 ${className}`}>
      {children}
    </div>
  );
}
