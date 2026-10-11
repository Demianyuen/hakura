import { Suspense } from "react";
import CreateContent from "./CreateContent";


export default function CreatePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-10 text-ink-500">載入中…</div>}>
      <CreateContent />
    </Suspense>
  );
}
