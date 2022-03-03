import API from "../../API";

export const getAllQuestions = (userId, token, data) => {
  return fetch(`${API}/question/${userId}`, {
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

export const saveActivity = (userId, quizId, token, data) => {
  return fetch(`${API}/activity/${userId}/${quizId}`, {
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

export const getActivities = (userId, token) => {
  return fetch(`${API}/activities/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response == null) {
        return false;
      }
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getActivity = (userId, quizId, token) => {
  return fetch(`${API}/activity/${userId}/${quizId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
