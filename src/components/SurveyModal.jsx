import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Award, Sparkles, RefreshCw } from 'lucide-react';
import { surveysData } from '../data/surveys';

export default function SurveyModal({ isOpen, onClose, initialSurveyId = null }) {
  if (!isOpen) return null;

  // Pick initial survey or default to first
  const [selectedSurvey, setSelectedSurvey] = useState(() => {
    if (initialSurveyId) {
      const found = surveysData.find(s => s.id === initialSurveyId || s.categoryId === initialSurveyId);
      if (found) return found;
    }
    return surveysData[0];
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = selectedSurvey.questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / selectedSurvey.questions.length) * 100);

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedSurvey.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = (survey) => {
    setSelectedSurvey(survey);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-surface-border shadow-2xl overflow-hidden animate-fadeIn relative">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-surface-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-brand-500 text-white font-bold flex items-center justify-center text-sm">
              9
            </span>
            <div>
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider block">
                {selectedSurvey.categoryName}
              </span>
              <h3 className="font-bold text-ink-primary text-base sm:text-lg line-clamp-1">
                {selectedSurvey.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-surface-border flex items-center justify-center text-ink-secondary hover:text-ink-primary hover:bg-gray-100 transition-colors"
            aria-label="Close survey modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <div>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-secondary mb-2">
                  <span>Question {currentQuestionIndex + 1} of {selectedSurvey.questions.length}</span>
                  <span className="text-brand-600 font-bold">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h4 className="text-xl sm:text-2xl font-bold text-ink-primary mb-6 leading-snug">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQuestion.id, idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/70 shadow-xs'
                          : 'border-surface-border hover:border-brand-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                        </span>
                        <span className={`text-sm sm:text-base ${isSelected ? 'font-bold text-ink-primary' : 'font-medium text-ink-secondary'}`}>
                          {option.text}
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-surface-borderLight">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border ${
                    currentQuestionIndex === 0
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-surface-border text-ink-secondary hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion.id] === undefined}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 ${
                    answers[currentQuestion.id] !== undefined
                      ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-green-glow'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQuestionIndex === selectedSurvey.questions.length - 1 ? 'Submit Opinion' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-ink-primary mb-2">
                Thank You for Sharing Your Opinion!
              </h4>
              <p className="text-ink-secondary text-sm max-w-md mx-auto mb-6">
                Your response has been aggregated anonymously into Now 9's real-time public opinion data.
              </p>

              {/* Summary of Public Sentiment for this survey */}
              <div className="bg-surface-subtle border border-surface-border rounded-2xl p-5 text-left mb-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-borderLight">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Live Public Consensus</span>
                  <span className="text-xs text-ink-secondary">{selectedSurvey.participants} total responses</span>
                </div>

                {selectedSurvey.questions.map((q, qIndex) => (
                  <div key={q.id} className="space-y-2">
                    <p className="text-xs font-semibold text-ink-primary">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oIndex) => {
                        const isUserPick = answers[q.id] === oIndex;
                        return (
                          <div key={oIndex} className="text-xs">
                            <div className="flex justify-between items-center text-ink-secondary mb-1">
                              <span className={isUserPick ? 'font-bold text-brand-700' : ''}>
                                {opt.text} {isUserPick && '(Your Vote)'}
                              </span>
                              <span className="font-semibold text-ink-primary">{opt.votes}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isUserPick ? 'bg-brand-500' : 'bg-gray-400'}`}
                                style={{ width: `${opt.votes}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-sm"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    const other = surveysData.find(s => s.id !== selectedSurvey.id);
                    if (other) handleReset(other);
                  }}
                  className="bg-white border border-surface-border hover:bg-gray-50 text-ink-primary font-semibold px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4 text-brand-600" />
                  <span>Try Another Survey</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
