// Load a reading test JSON file
async function loadTest(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path} (${res.status})`);
  }
  return await res.json();
}

// Render passage + questions
function renderTest(data) {
  // Passage
  document.getElementById("passageTitle").textContent =
    data.passage?.title ?? "";
  document.getElementById("passageText").textContent =
    data.passage?.text ?? "";

  // Questions
  const container = document.getElementById("questions");
  container.innerHTML = "";

  data.questions.forEach((q, index) => {
    const block = document.createElement("div");
    block.style.marginBottom = "16px";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${q.prompt}`;
    block.appendChild(prompt);

    // v1: simple text input (we’ll expand by type later)
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Answer…";
    input.dataset.questionId = q.id;
    block.appendChild(input);

    container.appendChild(block);
  });
}

// Wire up load button
document.getElementById("loadBtn").addEventListener("click", async () => {
  const path = document.getElementById("testSelect").value;
  try {
    const data = await loadTest(path);
    renderTest(data);
  } catch (err) {
    alert(err.message);
  }
});
