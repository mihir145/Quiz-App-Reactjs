import API from "../../API";

// const { user, token } = isAuthenticated();

export const createQuiz = (userId, token, data) => {
  return fetch(`${API}/quiz/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateQuiz = (userId, quizId, token, data) => {
  return fetch(`${API}/quiz/${userId}/${quizId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOne = (quizId) => {
  return fetch(`${API}/quiz/getOne/${quizId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getQuizzes = () => {
  return fetch(`${API}/quiz/getAll`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const deleteQuiz = (userId, quizId, token) => {
  return fetch(`${API}/quiz/${userId}/${quizId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addQuestion = (userId, quizId, token, data) => {
  return fetch(`${API}/question/${userId}/${quizId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateQuestion = (userId, quizId, questionId, token, data) => {
  return fetch(`${API}/question/${userId}/${quizId}/${questionId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteQuestion = (userId, quizId, questionId, token) => {
  return fetch(`${API}/question/${userId}/${quizId}/${questionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllQuestions = (userId, quizId, token) => {
  return fetch(`${API}/questions/${userId}/${quizId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
