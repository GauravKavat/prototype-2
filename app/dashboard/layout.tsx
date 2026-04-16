import { Header } from '../../components/dashboard/header';
import { ChatbotPlaceholder } from '../../components/dashboard/chatbot-placeholder';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </div>
      </main>
      <ChatbotPlaceholder />
    </div>
  );
}
