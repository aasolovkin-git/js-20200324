export default async function(path, match) {
  const { default: Page } = await import(`../pages/${path}/index.js`);
  const page = new Page(match);

  const contentNode = document.querySelector('#content');

  contentNode.innerHTML = '';
  contentNode.appendChild(page.element);

  return page;
}
