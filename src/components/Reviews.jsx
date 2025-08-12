// ReviewsTemplateRenderer.jsx
import React, { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";

/**
 * Renders a backend-provided static HTML layout (with static sample cards),
 * replaces the cards inside .reviews-grid with live reviews from API,
 * and preserves backend CSS.
 */
export default function ReviewsTemplateRenderer() {
  const [layoutHtml, setLayoutHtml] = useState("");
  const [cssText, setCssText] = useState("");
  const [reviews, setReviews] = useState([]);

  // Simulate fetching layout HTML, CSS and real reviews (replace with real fetch calls)
  useEffect(() => {
    const htmlTemplate = `
<section class="reviews-section">
  <h2 class="reviews-title">Customer Reviews</h2>
  <div class="reviews-grid">
    
    <div class="review-card">
      <div>
        <div class="review-header">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="review-avatar">
          <span class="review-name">Jane Doe</span>
        </div>
        <div class="review-rating">★★★★★</div>
        <p class="review-text">Amazing service! The product quality is top-notch and the delivery was faster than expected. Highly recommend!</p>
      </div>
    </div>

    <div class="review-card">
      <div>
        <div class="review-header">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="review-avatar">
          <span class="review-name">John Smith</span>
        </div>
        <div class="review-rating">★★★★☆</div>
        <p class="review-text">Very satisfied overall. Customer support was helpful. Just wish the price was a bit lower.</p>
      </div>
    </div>

    <div class="review-card">
      <div>
        <div class="review-header">
          <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" class="review-avatar">
          <span class="review-name">Emily Carter</span>
        </div>
        <div class="review-rating">★★★★☆</div>
        <p class="review-text">This is my third purchase and I’m still impressed! Everything works perfectly. Definitely my go-to shop.</p>
      </div>
    </div>

  </div>
</section>
`.trim();

    const cssTemplate = `
.reviews-section { padding: 2rem; background-color: #f9f9f9; font-family: Arial, sans-serif; }
.reviews-title { text-align: center; font-size: 1.8rem; margin-bottom: 1.5rem; }
.reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.review-card { background: white; border-radius: 10px; padding: 1.2rem; box-shadow: 0 4px 8px rgba(0,0,0,0.08); transition: transform 0.2s ease; }
.review-card:hover { transform: translateY(-4px); }
.review-header { display:flex; align-items:center; gap:.8rem; margin-bottom:.5rem; }
.review-avatar { width:50px; height:50px; border-radius:50%; object-fit:cover; }
.review-name { font-weight:bold; font-size:1.1rem; color: #000}
.review-rating { color:#ff9900; font-size:1.2rem; margin-bottom:.8rem; }
.review-text { font-size:.95rem; line-height:1.4; color:#333; }
`.trim();

    const reviewsData = [
      {
        name: "Michael Santos",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: "★★★★★",
        text: "The service was outstanding! Definitely coming back for more.",
      },
      {
        name: "Anna Lee",
        avatar: "https://randomuser.me/api/portraits/women/20.jpg",
        rating: "★★★★☆",
        text: "Great experience overall. A few small issues but nothing major.",
      },
      {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: "★★★★★",
        text: "Perfect from start to finish. Highly recommended!",
      },
      {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: "★★★★★",
        text: "Perfect from start to finish. Highly recommended!",
      },
    ];

    setLayoutHtml(htmlTemplate);
    setCssText(cssTemplate);
    setReviews(reviewsData);
  }, []);

  // inject css into head once
  useEffect(() => {
    if (!cssText) return;
    const style = document.createElement("style");
    style.dataset.generatedBy = "reviews-template-renderer";
    style.innerHTML = cssText;
    document.head.appendChild(style);
    return () => style.remove();
  }, [cssText]);

  // Extract the single .review-card template HTML (outerHTML) once layoutHtml is available
  const reviewCardTemplateHtml = useMemo(() => {
    if (!layoutHtml) return null;
    // Use DOMParser (browser) to parse the HTML string and get the first .review-card
    try {
      const doc = new DOMParser().parseFromString(layoutHtml, "text/html");
      const card = doc.querySelector(".review-card");
      return card ? card.outerHTML : null;
    } catch (e) {
      console.error("Failed to parse layoutHtml via DOMParser:", e);
      return null;
    }
  }, [layoutHtml]);

  function renderCardFromTemplate(review, idx) {
    if (!reviewCardTemplateHtml) return null;
    return (
      <React.Fragment key={idx}>
        {parse(reviewCardTemplateHtml, {
          replace: (domNode) => {
            if (!domNode || !domNode.attribs) return;

            const classAttr = domNode.attribs.class || "";
            const classes = classAttr.split(/\s+/).filter(Boolean);

            if (domNode.name === "img" && classes.includes("review-avatar")) {
              return (
                <img
                  className="review-avatar"
                  src={review.avatar}
                  alt={review.name}
                />
              );
            }
            if (domNode.name === "span" && classes.includes("review-name")) {
              return <span className="review-name">{review.name}</span>;
            }
            if (domNode.name === "div" && classes.includes("review-rating")) {
              return <div className="review-rating">{review.rating}</div>;
            }
            if (domNode.name === "p" && classes.includes("review-text")) {
              return <p className="review-text">{review.text}</p>;
            }

            return undefined;
          },
        })}
      </React.Fragment>
    );
  }

  // Parse the full layoutHtml and *replace the reviews-grid node* with our dynamic list
  // If layoutHtml isn't ready, show a fallback
  if (!layoutHtml) return <div>Loading layout…</div>;

  const parsedLayout = parse(layoutHtml, {
    replace: (domNode) => {
      if (!domNode || !domNode.attribs) return;

      const classAttr = domNode.attribs.class || "";
      const classes = classAttr.split(/\s+/).filter(Boolean);

      // When we find the container with class "reviews-grid", replace its contents
      if (classes.includes("reviews-grid")) {
        return (
          <div className="reviews-grid">
            {reviews.map((r, i) => renderCardFromTemplate(r, i))}
          </div>
        );
      }

      return undefined; // keep other nodes as-is
    },
  });

  return <div>{parsedLayout}</div>;
}
