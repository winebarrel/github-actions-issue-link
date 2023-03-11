function replaceIssueLink(url) {
  const span = document.querySelector("h3.PageHeader-title > span > span");

  if (!span) {
    return;
  }

  const text = span.textContent;
  const m = text.match(/#(\d+)/);

  if (!m) {
    return;
  }

  const num = m[1];
  const baseURL = url.split("/").slice(0, 5).join("/");
  const link = `<a href="${baseURL}/issues/${num}">#${num}</a>`;
  const textWithLink = text.replace(/#\d+/, link);
  span.innerHTML = textWithLink;
}

chrome.tabs.onUpdated.addListener(async (tabId, props, tab) => {
  if (
    props.status == "complete" &&
    tab.url?.startsWith("https://github.com/")
  ) {
    chrome.scripting.executeScript({
      target: { tabId },
      function: replaceIssueLink,
      args: [tab.url],
    });
  }
});
