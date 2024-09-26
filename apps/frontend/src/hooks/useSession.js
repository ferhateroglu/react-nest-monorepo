// hooks/useSession.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession, getNextQuestion, answerQuestion } from "../services/api";

export const useSession = (sessionId) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSession(sessionId),
    enabled: !!sessionId,
  });
};

export const useNextQuestion = (sessionId) => {
  return useQuery({
    queryKey: ["nextQuestion", sessionId],
    queryFn: () => getNextQuestion(sessionId),
    enabled: !!sessionId,
  });
};

export const useAnswerQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, answer }) => answerQuestion(sessionId, answer),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["nextQuestion", variables.sessionId],
      });
    },
  });
};
