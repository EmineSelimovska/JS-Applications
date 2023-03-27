function attachEvents() {
  const personInput = document.getElementById("person");
  const phoneInput = document.getElementById("phone");
  const phoneBook = document.getElementById("phonebook");

  const loadBtn = document.getElementById("btnLoad");
  const creatBtn = document.getElementById("btnCreate");

  const phoneBookUrl = "http://localhost:3030/jsonstore/phonebook";

  loadBtn.addEventListener("click", loadContacts);
  creatBtn.addEventListener("click", createPhoneContant);

  async function createPhoneContant() {
    if (!phoneInput.value || !personInput.value)
      return alert("No empty fields allowed");

    await fetch(phoneBookUrl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        person: personInput.value,
        phone: phoneInput.value,
      }),
    });
    personInput.value = "";
    personInput.value = "";
    loadBtn.click();
  }

  async function loadContacts() {
    const res = await fetch(phoneBookUrl);
    const data = await res.json();

    Object.values(data).forEach((el) => {
      const li = document.createElement("li");
      li.textContent = `${el["person"]}: ${el["phone"]}`;

      const delBtn = document.createElement("button");
      delBtn.setAttribute(`id`, el["_id"]);
      delBtn.textContent = "Delete";

      li.appendChild(delBtn);
      phoneBook.appendChild(li);

      delBtn.addEventListener("click", async (ev) => {
        const userId = ev.target.id;
        const targetUrl = `${phoneBookUrl}/${userId}`;

        await fetch(targetUrl, {
          method: "DELETE",
        });
        ev.target.parentNode.remove();
      });
    });
  }
}

attachEvents();
