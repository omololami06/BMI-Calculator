let isMetric = true;

function switchUnit() {
  const unit = document.getElementById("unitSelect").value;
  isMetric = unit === "metric";
  document.getElementById("weight").placeholder = isMetric
    ? "Enter your weight (kg)"
    : "Enter your weight (lbs)";
  document.getElementById("height").placeholder = isMetric
    ? "Enter your height (m)"
    : "Enter your height (in)";
}

function calculateBMI() {
  let weight = parseFloat(document.getElementById("weight").value.trim());
  let height = parseFloat(document.getElementById("height").value.trim());
  const resultDiv = document.getElementById("result");
  const tipDiv = document.getElementById("tip");

  resultDiv.textContent = "";
  tipDiv.textContent = "";

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    resultDiv.textContent = "⚠️ Please enter valid positive numbers.";
    return;
  }

  if (!isMetric) {
    weight = weight * 0.453592;
    height = height * 0.0254;
  }

  const bmi = (weight / (height * height)).toFixed(2);
  localStorage.setItem("lastBMI", bmi);

  let message = "",
    tip = "";

  if (bmi < 18.5) {
    message = `Your BMI is ${bmi} (Underweight)`;
    tip = "Consider a nutrient-rich diet and strength exercises.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    message = `Your BMI is ${bmi} (Normal weight)`;
    tip = "Keep maintaining a balanced lifestyle.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    message = `Your BMI is ${bmi} (Overweight)`;
    tip = "Increase physical activity and monitor your diet.";
  } else {
    message = `Your BMI is ${bmi} (Obese)`;
    tip = "Consult a health professional for guidance.";
  }

  resultDiv.textContent = message;
  tipDiv.textContent = tip;
}

function resetForm() {
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("tip").textContent = "";
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

window.onload = function () {
  const last = localStorage.getItem("lastBMI");
  if (last) {
    document.getElementById("result").textContent = `Your last BMI was ${last}`;
  }
};
