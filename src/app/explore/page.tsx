import { Suspense } from "react";
import ExploreContent from "./ExploreContent";


export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-10 text-ink-500">載入中…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
