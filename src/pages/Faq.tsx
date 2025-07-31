import FaqList from "../components/faq/FaqList";

function FAQ() {
  return (
    <div className="pg-faq flex justify-center items-start min-h-screen bg-yellow-100 py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Perguntas Frequentes (FAQ)
        </h2>
        <FaqList />
      </div>
    </div>
  );
}

export default FAQ;
