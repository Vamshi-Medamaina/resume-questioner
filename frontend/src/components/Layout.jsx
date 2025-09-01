import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UploadCard from "./UploadCard";
import QuestionCard from "./QuestionCard";

export default function Layout() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="layout">
      <Header />
      <main className="main-section">
        <section className="card">
          <UploadCard setLoading={setLoading} setQuestions={setQuestions} />
        </section>

        <section className="card">
          <QuestionCard loading={loading} questions={questions} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
