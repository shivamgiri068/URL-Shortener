async function shortenURL() {
  let longUrl = document.getElementById("longUrl").value;
  let resultDiv = document.getElementById("result");

  if (!longUrl) {
    resultDiv.innerHTML = "❌ Please enter a URL";
    return;
  }

  try {
    let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${longUrl}`);
    let data = await response.json();

    if (data.ok) {
      let shortLink = data.result.full_short_link;

      resultDiv.innerHTML = `
        ✅ Short URL: <a href="${shortLink}" target="_blank">${shortLink}</a>
        <br><br>
        <button onclick="copyURL('${shortLink}')">Copy</button>
      `;
    } else {
      resultDiv.innerHTML = "❌ Invalid URL";
    }

  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error occurred!";
  }
}

function copyURL(url) {
  navigator.clipboard.writeText(url);
  alert("Copied to clipboard!");
}
