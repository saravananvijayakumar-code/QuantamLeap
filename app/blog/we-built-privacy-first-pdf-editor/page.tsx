import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "We Built a Privacy-First PDF Editor That Never Touches Your Files | Quantum Leap Ventures",
  description:
    "How Quantum Leap Ventures built PDFEdit4U — a browser-based PDF editor that processes all documents locally with zero server uploads. Technical case study.",
};

export default function PdfEditorBlogPost() {
  return (
    <main className="min-h-screen bg-dark-primary">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-neon-cyan hover:underline mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="text-sm text-neon-cyan mb-3">June 2025 • Case Study / Engineering</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-4 leading-tight">
            We Built a Privacy-First PDF Editor That Never Touches Your Files
          </h1>
          <p className="text-lg text-[#a0a0b0] leading-relaxed italic">
            How Quantum Leap Ventures engineered PDFEdit4U — a browser-based document tool where every operation happens on the user&apos;s device.
          </p>
          <div className="mt-6">
            <a
              href="https://www.pdfedit4u.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neon-cyan/50 text-neon-cyan text-sm font-medium transition-all duration-300 hover:bg-neon-cyan/10 hover:shadow-neon-cyan"
            >
              🔗 Visit PDFEdit4U.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-6 text-[#c8c8d0] leading-relaxed">

          <p>
            Most PDF tools online have a dirty secret. When you click &ldquo;upload,&rdquo; your document
            travels to a server in another country, gets processed by software you cannot inspect, and
            sits on hardware you do not own. They promise to delete it. You just have to trust them.
          </p>
          <p>
            We did not think that was good enough. So we built something different.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">What is PDFEdit4U?</h2>
          <p>
            PDFEdit4U is a full-featured PDF editor that runs entirely inside your web browser. Merge
            documents, add signatures, convert pages to images, extract text, crop margins, add page
            numbers — all without your file ever leaving your computer.
          </p>
          <p>
            It is not a stripped-down demo. It is a production application serving real users who need
            to handle sensitive contracts, tax forms, medical paperwork, and legal documents without
            handing them to a third party.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">The Technical Challenge</h2>
          <p>
            Building a serious document editor that runs client-side is not straightforward. PDF is a
            complex format — 1,310 pages of specification covering fonts, encryption, color spaces,
            annotations, and interactive forms. Making all of that work inside a browser tab, with no
            server to fall back on, required careful engineering decisions.
          </p>
          <p>We chose a stack that could handle it:</p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li><strong className="text-[#f0f0f0]">React with TypeScript</strong> for the application layer</li>
            <li><strong className="text-[#f0f0f0]">pdf-lib</strong> for creating and modifying PDF documents programmatically</li>
            <li><strong className="text-[#f0f0f0]">PDF.js</strong> (Mozilla&apos;s renderer) for reading pages and extracting content</li>
            <li><strong className="text-[#f0f0f0]">Canvas API</strong> for image conversion at configurable DPI</li>
            <li><strong className="text-[#f0f0f0]">Service workers</strong> for offline capability and instant loading</li>
          </ul>
          <p>
            The result is a Progressive Web App that installs on any device, works without internet
            after first load, and processes files using only the user&apos;s own CPU and memory.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">What We Shipped</h2>
          <p>
            The editor handles the full range of common PDF operations: annotations, highlights,
            drawings, text boxes, signatures, stamps, merge, split, compress, and rotate. All in-browser.
          </p>
          <p>
            Beyond the editor, we built seven standalone tool pages — focused single-purpose interfaces
            for quick tasks:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li><strong className="text-[#f0f0f0]">PDF to JPG and PDF to PNG</strong> with quality and DPI controls</li>
            <li><strong className="text-[#f0f0f0]">JPG to PDF</strong> with drag-to-reorder image sequencing</li>
            <li><strong className="text-[#f0f0f0]">PDF to Text</strong> with a Markdown extraction mode that reduces AI token usage by 15-30%</li>
            <li><strong className="text-[#f0f0f0]">Add Page Numbers</strong> with configurable position, format, and font size</li>
            <li><strong className="text-[#f0f0f0]">Crop PDF</strong> with a visual overlay and draggable edge handles</li>
            <li><strong className="text-[#f0f0f0]">Flatten PDF</strong> that converts form fields to static content</li>
          </ul>
          <p>
            Each tool loads on demand, processes instantly, and produces a downloadable result without
            any network activity.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">The Privacy Architecture</h2>
          <p>
            We did not just add a privacy policy. We made data leakage architecturally impossible.
          </p>
          <p>
            When a user selects a file, the browser&apos;s File API reads it into local memory. Our
            JavaScript processes that data using the libraries listed above. The result gets packaged
            as a Blob and offered for download via a temporary object URL. After download, the URL is
            revoked and memory is released when the tab closes.
          </p>
          <p>
            There is no upload endpoint. No file storage. No processing queue. No database entry for
            user documents. The Network tab in developer tools shows zero requests related to file data
            during any operation.
          </p>

          <div className="rounded-lg border border-neon-green/30 bg-neon-green/5 p-4 my-6">
            <p className="text-neon-green font-medium mb-1">🔒 Verify It Yourself</p>
            <p className="text-sm text-[#a0a0b0]">
              Disable your internet connection after the page loads. Every tool continues to work
              perfectly. That is the proof.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Engineering Decisions Worth Noting</h2>
          <p>A few choices we made that shaped the final product:</p>
          <p>
            <strong className="text-[#f0f0f0]">Lazy loading everywhere.</strong> Each tool is a separate
            code-split chunk. Users only download the JavaScript for the specific tool they use. Initial
            page load stays fast.
          </p>
          <p>
            <strong className="text-[#f0f0f0]">Processing engines separated from UI.</strong> Every tool
            has a pure async function that takes an ArrayBuffer and returns a result. These are
            independently testable and have no dependency on React or the DOM.
          </p>
          <p>
            <strong className="text-[#f0f0f0]">Heuristic markdown extraction.</strong> Our PDF-to-Markdown
            engine analyses font size ratios to detect headings, parses font names for bold/italic
            indicators, uses Y-position gaps for paragraph detection, and matches text patterns for
            lists. It is not perfect for every document, but it handles typical business documents well
            enough to meaningfully reduce token consumption when feeding content to AI models.
          </p>
          <p>
            <strong className="text-[#f0f0f0]">Honest limitations on every page.</strong> Each tool
            clearly states what it can and cannot do. We would rather a user know upfront that we cannot
            handle OCR than discover it after uploading a scanned document.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">What We Learned</h2>
          <p>
            <strong className="text-[#f0f0f0]">Browser memory is the constraint.</strong> A 200-page PDF
            at 300 DPI pushes limits on lower-end devices. We handle this with clear warnings, graceful
            error recovery, and documentation that explains exactly what is happening and how to fix it.
          </p>
          <p>
            <strong className="text-[#f0f0f0]">Not everything can be done client-side today.</strong>{" "}
            Password-encrypted PDF decryption, for instance, is not reliably supported by current
            JavaScript libraries. We removed that feature rather than ship something that would fail
            silently. Honesty builds more trust than feature checkboxes.
          </p>
          <p>
            <strong className="text-[#f0f0f0]">Progressive Web Apps are production-ready.</strong>{" "}
            Service workers, install prompts, offline mode — the platform has matured. Users can install
            PDFEdit4U alongside native apps and it behaves like one.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">The Result</h2>
          <p>
            A shipping product that processes sensitive documents with zero server involvement, installs
            as a PWA, works offline, and honestly communicates its capabilities and limitations. Built by
            a small team, deployed on Google Cloud Run, and available free at{" "}
            <a
              href="https://www.pdfedit4u.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline"
            >
              pdfedit4u.com
            </a>.
          </p>
          <p>
            If your organisation needs a privacy-first tool, a browser-based utility, or a client-side
            processing solution built to production standards — that is what we do.
          </p>

          {/* Tech tags */}
          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 my-4">
            {[
              "React", "TypeScript", "pdf-lib", "PDF.js", "Canvas API",
              "Service Workers", "PWA", "Google Cloud Run", "Docker",
              "Privacy Engineering", "Client-Side Processing",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs border border-neon-purple/30 text-neon-purple bg-neon-purple/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-neon-cyan/10">
            <a
              href="https://www.pdfedit4u.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-semibold transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-neon-cyan hover:scale-105"
            >
              Try PDFEdit4U — Free, No Upload Required →
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
