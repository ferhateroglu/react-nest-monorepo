import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Utility functions to interact with the API
export const fetchSessions = async (page, limit) => {
  try {
    const response = await api.get(
      `/chatbot/sessions?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSession = async () => {
  try {
    const response = await api.post("/chatbot/sessions");
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const getSession = async (sessionId) => {
  try {
    const response = await api.get(`/chatbot/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

export const getNextQuestion = async (sessionId) => {
  try {
    const response = await api.get(
      `/chatbot/sessions/${sessionId}/next-question`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting next question:", error);
    throw error;
  }
};

export const answerQuestion = async (sessionId, answer) => {
  try {
    await api.post(`/chatbot/sessions/${sessionId}/answers`, { answer });
  } catch (error) {
    console.error("Error answering question:", error);
    throw error;
  }
};

export const getSessionStatus = async (sessionId) => {
  try {
    const response = await api.get(`/chatbot/sessions/${sessionId}/status`);
    return response.data;
  } catch (error) {
    console.error("Error getting session status:", error);
    throw error;
  }
};
