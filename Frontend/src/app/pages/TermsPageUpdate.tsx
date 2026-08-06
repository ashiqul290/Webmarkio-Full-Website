import { termsData } from "../../data/tramsdata";

export default function TermsPageNew() {
  return (
    <section className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-2">Terms of Service</h1>

      <p className="text-gray-500 mb-16">
        Last updated: August 1, 2026
      </p>

      <div className="space-y-12">
        {termsData.map((term) => (
          <div key={term.id}>
            <h2 className="text-2xl font-semibold mb-4">
              {term.id}. {term.title}
            </h2>

            <p className="text-gray-400 leading-8">
              {term.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}