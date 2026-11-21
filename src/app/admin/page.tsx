import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import { getLibraryMedia } from "@/lib/library-media";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${SITE_CONFIG.brandName}`,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const { photos, videos } = getLibraryMedia();
  return <AdminDashboard libraryPhotos={photos} libraryVideos={videos} />;
}
