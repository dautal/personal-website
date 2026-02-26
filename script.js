function setText(id, value) {
  const node = document.getElementById(id);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
}

function clearNode(node) {
  if (node) {
    node.textContent = "";
  }
}

function makeLink(link, className) {
  const a = document.createElement("a");
  a.href = link.href;
  a.textContent = link.label;
  if (className) {
    a.className = className;
  }
  if (link.newTab) {
    a.target = "_blank";
    a.rel = "noreferrer";
  }
  return a;
}

function renderCompactList(points) {
  const ul = document.createElement("ul");
  ul.className = "compact-list";

  points.forEach((point) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${point.label}:`;
    li.appendChild(strong);
    li.append(` ${point.text}`);
    ul.appendChild(li);
  });

  return ul;
}

function renderHome(content) {
  setText("home-hero-note", content.heroNote);
  setText("home-value-meta", content.valueMeta);
  setText("home-headline", content.headline);
  setText("home-intro", content.intro);
  setText("home-proof-meta", content.proofMeta);
  setText("home-proof-heading", content.proofHeading);

  const ctaNode = document.getElementById("home-cta");
  clearNode(ctaNode);
  if (ctaNode) {
    content.ctas.forEach((cta) => {
      ctaNode.appendChild(makeLink(cta, cta.primary ? "primary" : ""));
    });
  }

  const statsNode = document.getElementById("home-stats");
  clearNode(statsNode);
  if (statsNode) {
    content.stats.forEach((stat) => {
      const wrapper = document.createElement("div");
      wrapper.className = "stat";

      const value = document.createElement("strong");
      value.textContent = stat.value;

      const text = document.createElement("span");
      text.textContent = stat.text;

      wrapper.append(value, text);
      statsNode.appendChild(wrapper);
    });
  }

  const previewsNode = document.getElementById("home-previews");
  clearNode(previewsNode);
  if (previewsNode) {
    content.previews.forEach((preview) => {
      const article = document.createElement("article");
      article.className = "item";

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.textContent = preview.meta;

      const title = document.createElement("h3");
      title.textContent = preview.title;

      const text = document.createElement("p");
      text.textContent = preview.text;

      const link = makeLink({
        href: preview.href,
        label: preview.linkLabel,
      });

      article.append(meta, title, text, link);
      previewsNode.appendChild(article);
    });
  }

}

function renderBio(content) {
  setText("bio-title", content.title);
  setText("bio-intro", content.intro);
}

function renderProfessional(content) {
  setText("professional-title", content.title);

  const experienceNode = document.getElementById("professional-experience-list");
  clearNode(experienceNode);
  if (experienceNode) {
    content.experience.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "item";

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.textContent = entry.meta;

      const role = document.createElement("h3");
      role.textContent = entry.role;

      item.append(meta, role, renderCompactList(entry.bullets));
      experienceNode.appendChild(item);
    });
  }

  const skillsNode = document.getElementById("professional-skills-list");
  clearNode(skillsNode);
  if (skillsNode && content.skills) {
    content.skills.forEach((skill) => {
      const article = document.createElement("article");
      article.className = "item";

      const title = document.createElement("h3");
      title.textContent = skill.title;

      const text = document.createElement("p");
      text.textContent = skill.text;

      article.append(title, text);
      skillsNode.appendChild(article);
    });
  }

  const educationNode = document.getElementById("professional-education-list");
  clearNode(educationNode);
  if (educationNode) {
    content.education.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "item";

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.textContent = entry.meta;

      const school = document.createElement("h3");
      school.textContent = entry.school;

      const degree = document.createElement("p");
      degree.textContent = entry.degree;

      item.append(meta, school, degree);
      educationNode.appendChild(item);
    });
  }

  const honorsNode = document.getElementById("professional-honors-list");
  clearNode(honorsNode);
  if (honorsNode) {
    content.honors.forEach((entry) => {
      const article = document.createElement("article");
      article.className = "item";

      const title = document.createElement("h3");
      title.textContent = entry.title;

      const text = document.createElement("p");
      text.textContent = entry.text;

      article.append(title, text);
      honorsNode.appendChild(article);
    });
  }

  const communityNode = document.getElementById("professional-community-list");
  clearNode(communityNode);
  if (communityNode) {
    content.community.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "item";

      const role = document.createElement("h3");
      role.textContent = entry.role;

      const text = document.createElement("p");
      text.textContent = entry.text;

      item.append(role, text);
      communityNode.appendChild(item);
    });
  }
}

function renderProjects(content) {
  setText("projects-title", content.title);

  const listNode = document.getElementById("projects-list");
  clearNode(listNode);
  if (listNode) {
    content.items.forEach((project) => {
      const article = document.createElement("article");
      article.className = "item";

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.textContent = project.meta;

      const title = document.createElement("h3");
      title.textContent = project.title;

      article.append(meta, title, renderCompactList(project.bullets));
      listNode.appendChild(article);
    });
  }
}

function renderContact(content) {
  setText("contact-meta", content.meta);
  setText("contact-title", content.title);
  setText("contact-intro", content.intro);

  const methodsNode = document.getElementById("contact-methods");
  clearNode(methodsNode);
  if (methodsNode) {
    content.methods.forEach((method) => {
      const article = document.createElement("article");
      article.className = "item";

      const title = document.createElement("h3");
      title.textContent = method.title;

      const value = document.createElement("p");
      value.textContent = method.value;

      const link = makeLink(
        {
          href: method.href,
          label: method.actionLabel,
          newTab: Boolean(method.newTab),
        },
      );

      article.append(title, value, link);
      methodsNode.appendChild(article);
    });
  }
}

function renderPageContent() {
  const content = window.SITE_CONTENT;
  const page = document.body.dataset.page;
  if (!content || !page) {
    return;
  }

  if (page === "home" && content.home) {
    renderHome(content.home);
  }

  if (page === "bio" && content.bio) {
    renderBio(content.bio);
  }

  if (page === "professional" && content.professional) {
    renderProfessional(content.professional);
  }

  if (page === "projects" && content.projects) {
    renderProjects(content.projects);
  }

  if (page === "contact" && content.contactPage) {
    renderContact(content.contactPage);
  }
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

renderPageContent();
