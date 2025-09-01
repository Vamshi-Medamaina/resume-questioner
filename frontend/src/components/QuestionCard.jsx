export default function QuestionCard({ loading, questions }) {
  return (
    <div className="question-card">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="question-card-content">
          <h2>Interview Questions</h2>
          <div>
            {questions.length === 0 ? (
              <p>Question will be displayed here</p>
            ) : (
              <div className="question-list">
                <ul>
                  {questions.map((q, idx) => (
                    <div className="question-item" key={idx}>
                      <p>
                        <li>{q.question}</li>
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
