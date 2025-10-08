import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Swift Reports HMRC – RTI Submissions Made Easy',
    description: 'Production-ready Swift server for HMRC RTI submissions with IRmark calculation and GovTalk XML handling',
}

export default function SwiftReportsHMRLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
