import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSavedWordsOrFalse } from "../utils";
import { sections } from "../words/words";
import { Quiz } from "./Quiz";

export const QuizPage = () => {
  const { sectionId, domainId } = useParams();
  const [searchParams] = useSearchParams();
  const saved = searchParams.get("saved");
  const shuffle = searchParams.get("shuffle");
  const navigate = useNavigate();
  const currentSection = sections.find((s) => s.id === sectionId);
  if (!currentSection) return "Sidan hittas inte";
  const currentDomain = currentSection.domains.find((d) => d.id === domainId);
  if (!currentDomain) return "Sidan hittas inte";

  const subSet = saved ? getSavedWordsOrFalse(currentDomain.domain) : false;
  return (
    <Quiz
      domain={currentDomain}
      shuffle={shuffle}
      subSet={subSet}
      sectionId={sectionId}
      onBack={() => navigate(`/${sectionId}`)}
    />
  );
};
