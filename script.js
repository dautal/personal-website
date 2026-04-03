// Helper: set plain text content by element id.
function setText(id, value) {
  const node = document.getElementById(id);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
}

// Helper: set HTML content by element id (used when content includes tags like <strong>).
function setHtml(id, value) {
  const node = document.getElementById(id);
  if (node && typeof value === "string") {
    node.innerHTML = value;
  }
}

// Helper: clear an element before rebuilding dynamic content.
function clearNode(node) {
  if (node) {
    node.textContent = "";
  }
}

// Helper: create a link element from a content config object.
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

// Adds hover-preview + click-to-pin behavior to project details cards.
function enhanceProjectDetails(details) {
  if (!(details instanceof HTMLDetailsElement)) {
    return;
  }

  const summary = details.querySelector("summary");
  if (!(summary instanceof HTMLElement)) {
    return;
  }

  details.dataset.pinned = details.open ? "true" : "false";
  details.dataset.preview = "false";

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    const pinned = details.dataset.pinned === "true";
    const previewing = details.dataset.preview === "true";

    if (previewing && !pinned) {
      details.dataset.preview = "false";
      details.dataset.pinned = "true";
      details.open = true;
      return;
    }

    const nextPinned = !pinned;
    details.dataset.preview = "false";
    details.dataset.pinned = String(nextPinned);
    details.open = nextPinned;
  });

  details.addEventListener("mouseenter", () => {
    if (details.dataset.pinned === "true") {
      return;
    }

    details.dataset.preview = "true";
    details.open = true;
  });

  details.addEventListener("mouseleave", () => {
    if (details.dataset.pinned === "true") {
      return;
    }

    details.dataset.preview = "false";
    details.open = false;
  });
}

// Builds bullet lists used in Professional and Projects cards.
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

// Renders Home page dynamic sections (hero text, CTAs, stats, preview cards).
function renderHome(content) {
  setText("home-hero-note", content.heroNote);
  setText("home-value-meta", content.valueMeta);
  setText("home-headline", content.headline);
  setHtml("home-intro", content.intro);
  setText("home-proof-meta", content.proofMeta);
  setText("home-proof-heading", content.proofHeading);

  // Replace CTA buttons from content config.
  const ctaNode = document.getElementById("home-cta");
  clearNode(ctaNode);
  if (ctaNode) {
    content.ctas.forEach((cta) => {
      ctaNode.appendChild(makeLink(cta, cta.primary ? "primary" : ""));
    });
  }

  // Rebuild stat cards.
  const statsNode = document.getElementById("home-stats");
  clearNode(statsNode);
  if (statsNode) {
    content.stats.forEach((stat) => {
      const wrapper = document.createElement("div");
      wrapper.className = "stat";

      const value = document.createElement("strong");
      value.textContent = stat.value;

      const text = document.createElement("span");
      text.textContent = String(stat.text || "");

      wrapper.append(value, text);

      if (
        (stat.secondaryActionLabel && stat.secondaryActionHref) ||
        (stat.actionLabel && stat.actionHref)
      ) {
        const actions = document.createElement("div");
        actions.className = "stat-actions";

        if (stat.actionLabel && stat.actionHref) {
          const action = makeLink(
            {
              href: stat.actionHref,
              label: stat.actionLabel,
            },
            "stat-action",
          );
          actions.appendChild(action);
        }

        if (stat.secondaryActionLabel && stat.secondaryActionHref) {
          const secondaryAction = makeLink(
            {
              href: stat.secondaryActionHref,
              label: stat.secondaryActionLabel,
              newTab: stat.secondaryActionNewTab,
            },
            "stat-action secondary",
          );
          actions.appendChild(secondaryAction);
        }

        wrapper.appendChild(actions);
      }

      statsNode.appendChild(wrapper);
    });
  }

  // Rebuild preview cards if the section exists on the page.
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

// Renders Bio page text fields.
function renderBio(content) {
  setText("bio-title", content.title);
  setText("bio-intro", content.intro);
}

// Renders Professional page sections: experience, skills, education, honors, community.
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

      const details = renderCompactList(entry.bullets);
      details.classList.add("section-hidden-content");

      item.append(meta, role, details);
      experienceNode.appendChild(item);
    });
  }

  const skillsNode = document.getElementById("professional-skills-list");
  clearNode(skillsNode);
  if (skillsNode && content.skills) {
    content.skills.forEach((skill) => {
      const article = document.createElement("article");
      article.className = "item skill-card";

      const header = document.createElement("div");
      header.className = "skill-card-header";

      const title = document.createElement("h3");
      title.textContent = skill.title;
      header.append(title);

      const body = document.createElement("div");
      body.className = "skill-card-body";

      const list = document.createElement("ul");
      list.className = "compact-list";
      const skillItems = Array.isArray(skill.items)
        ? skill.items
        : String(skill.text || "")
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean);
      skillItems.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        list.appendChild(li);
      });

      body.appendChild(list);
      body.classList.add("section-hidden-content");
      article.append(header, body);
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
      school.textContent = `${entry.school}, ${entry.degree}`;

      item.append(meta, school);
      educationNode.appendChild(item);
    });
  }

  const honorsNode = document.getElementById("professional-honors-list");
  clearNode(honorsNode);
  if (honorsNode) {
    content.honors.forEach((entry) => {
      const article = document.createElement("div");
      article.className = "item";

      const title = document.createElement("h3");
      title.textContent = entry.title;

      const text = document.createElement("p");
      text.textContent = entry.text;
      text.classList.add("section-hidden-content");

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
      text.classList.add("section-hidden-content");

      item.append(role, text);
      communityNode.appendChild(item);
    });
  }

  const expandableSections = Array.from(document.querySelectorAll("[data-expandable-section]"));
  const setSectionExpanded = (section, expanded) => {
    if (!(section instanceof HTMLElement)) {
      return;
    }

    section.classList.toggle("is-expanded", expanded);
    const toggle = section.querySelector(".section-toggle-row");
    if (toggle instanceof HTMLElement) {
      toggle.setAttribute("aria-expanded", String(expanded));
    }
  };

  expandableSections.forEach((section, index) => {
    const toggle = section.querySelector(".section-toggle-row");
    if (!(toggle instanceof HTMLElement)) {
      return;
    }

    if (index !== 0) {
      return;
    }

    toggle.onclick = () => {
      const nextExpanded = !section.classList.contains("is-expanded");
      expandableSections.forEach((targetSection) => {
        setSectionExpanded(targetSection, nextExpanded);
      });
    };

    section.classList.add("section-master-toggle");
    section.onclick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest("a, button")) {
        return;
      }

      const nextExpanded = !section.classList.contains("is-expanded");
      expandableSections.forEach((targetSection) => {
        setSectionExpanded(targetSection, nextExpanded);
      });
    };
  });

  if (window.location.hash === "#experience") {
    expandableSections.forEach((section) => {
      setSectionExpanded(section, true);
    });
  }

}

// Renders Projects list cards.
function renderProjects(content) {
  setText("projects-title", content.title);

  const listNode = document.getElementById("projects-list");
  clearNode(listNode);
  if (listNode) {
    content.items.forEach((project) => {
      const hasExpandableContent =
        project.description ||
        project.bullets?.length ||
        project.stack ||
        project.why ||
        project.future ||
        project.links?.length;

      if (hasExpandableContent) {
        const details = document.createElement("details");
        details.className = "item project-details";
        if (project.slug) {
          details.id = project.slug;
        }

        const summary = document.createElement("summary");
        const meta = document.createElement("p");
        meta.className = "meta";
        meta.textContent = project.meta;

        const title = document.createElement("h3");
        title.textContent = project.title;

        summary.append(meta, title);

        if (project.subtitle) {
          const subtitle = document.createElement("p");
          subtitle.className = "project-subtitle";
          subtitle.textContent = project.subtitle;
          summary.appendChild(subtitle);
        }

        const cue = document.createElement("p");
        cue.className = "project-expand-cue";

        const openCue = document.createElement("span");
        openCue.className = "project-cue-open";
        openCue.textContent = "View details";

        const previewCue = document.createElement("span");
        previewCue.className = "project-cue-preview";
        previewCue.textContent = "Click to keep open";

        const closeCue = document.createElement("span");
        closeCue.className = "project-cue-close";
        closeCue.textContent = "Close details";

        cue.append(openCue, previewCue, closeCue);
        summary.appendChild(cue);

        details.appendChild(summary);

        const detailsBody = document.createElement("div");
        detailsBody.className = "project-details-body";

        if (project.description) {
          const description = document.createElement("p");
          description.textContent = project.description;
          detailsBody.appendChild(description);
        }

        if (project.detailMeta) {
          const detailMeta = document.createElement("p");
          detailMeta.className = "project-detail-meta";
          detailMeta.textContent = project.detailMeta;
          detailsBody.appendChild(detailMeta);
        }

        if (project.bullets?.length) {
          detailsBody.appendChild(renderCompactList(project.bullets));
        }

        if (project.stack) {
          const stack = document.createElement("p");
          stack.className = "project-stack";
          stack.innerHTML = `<strong>Stack:</strong> ${project.stack}`;
          detailsBody.appendChild(stack);
        }

        if (project.why) {
          const why = document.createElement("p");
          why.className = "project-note";
          why.innerHTML = `<strong>Why I built it:</strong> ${project.why}`;
          detailsBody.appendChild(why);
        }

        if (project.future) {
          const future = document.createElement("p");
          future.className = "project-note";
          future.innerHTML = `<strong>Future direction:</strong> ${project.future}`;
          detailsBody.appendChild(future);
        }

        if (project.links?.length) {
          const links = document.createElement("div");
          links.className = "hero-cta";
          project.links.forEach((link) => {
            links.appendChild(makeLink(link, link.primary ? "primary" : ""));
          });
          detailsBody.appendChild(links);
        }

        details.appendChild(detailsBody);
        enhanceProjectDetails(details);
        listNode.appendChild(details);
      } else if (project.subtitle) {
        const article = document.createElement("article");
        article.className = "item";

        const meta = document.createElement("p");
        meta.className = "meta";
        meta.textContent = project.meta;

        const title = document.createElement("h3");
        title.textContent = project.title;

        const subtitle = document.createElement("p");
        subtitle.className = "project-subtitle";
        subtitle.textContent = project.subtitle;
        article.append(meta, title, subtitle);
        listNode.appendChild(article);
      }
    });
  }

  const miscNode = document.getElementById("projects-misc");
  clearNode(miscNode);
  if (miscNode && content.miscellaneous) {
    const details = document.createElement("details");
    details.className = "item project-details";
    if (content.miscellaneous.slug) {
      details.id = content.miscellaneous.slug;
    }

    const summary = document.createElement("summary");

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = content.miscellaneous.meta || "Placeholder";

    const title = document.createElement("h3");
    title.textContent = content.miscellaneous.title;

    const subtitle = document.createElement("p");
    subtitle.className = "project-subtitle";
    subtitle.textContent = content.miscellaneous.subtitle || "";

    const cue = document.createElement("p");
    cue.className = "project-expand-cue";
    cue.innerHTML =
      '<span class="project-cue-open">View details</span><span class="project-cue-preview">Click to keep open</span><span class="project-cue-close">Close details</span>';

    summary.append(meta, title, subtitle, cue);

    const body = document.createElement("div");
    body.className = "project-details-body";

    if (content.miscellaneous.bullets?.length) {
      const list = document.createElement("ul");
      list.className = "compact-list";
      content.miscellaneous.bullets.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        list.appendChild(li);
      });
      body.appendChild(list);
    }

    details.append(summary, body);
    enhanceProjectDetails(details);
    miscNode.appendChild(details);
  }

  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    const targetDetails = document.getElementById(hash);
    if (targetDetails instanceof HTMLDetailsElement) {
      targetDetails.dataset.preview = "false";
      targetDetails.dataset.pinned = "true";
      targetDetails.open = true;
      targetDetails.scrollIntoView({ block: "start" });
    }
  }
}

// Renders Contact page title/intro and contact method cards.
function renderContact(content) {
  setText("contact-meta", content.meta);
  setText("contact-title", content.title);
  setText("contact-intro", content.intro);
  setText("contact-privacy-note", content.privacyNote);

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

// Routes rendering based on <body data-page="..."> and loaded window.SITE_CONTENT.
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

// Footer year is always current year.
const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

renderPageContent();
