// ReviewsTemplateRenderer.jsx
import React, { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";

/**
 * Renders a backend-provided static HTML layout (with static sample cards),
 * replaces the cards inside .reviews-grid with live reviews from API,
 * and preserves backend CSS.
 */
function RenderMedia({ images = [], videos = [] }) {
  return (
    <div className="review-media">
      {images.map((img, idx) => (
        <div className="media-item" key={`img-${idx}`}>
          <img src={img} alt={`Review image ${idx + 1}`} />
        </div>
      ))}
      {videos.map((video, idx) => (
        <div className="media-item" key={`video-${idx}`}>
          <video src={video} controls />
        </div>
      ))}
    </div>
  );
}
export default function ReviewsTemplateRenderer() {
  const [layoutHtml, setLayoutHtml] = useState("");
  const [cssText, setCssText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);
  console.log(reviews);
  // Simulate fetching layout HTML, CSS and real reviews (replace with real fetch calls)
  useEffect(() => {
    const htmlTemplate = `
    <section class="reviews-section">
      <div class="reviews-container">
        <div class="reviews-header">
          <div class="floating-stars">
            <div class="floating-star">★</div>
            <div class="floating-star">★</div>
            <div class="floating-star">★</div>
            <div class="floating-star">★</div>
          </div>
          <h2 class="reviews-title">Customer Reviews</h2>
          <p class="reviews-subtitle">
            See what our customers are saying about this product
          </p>
          <div class="trust-marquee">
            <div class="marquee-content">
              ⭐ 5-Star Rated • 1000+ Happy Customers • Trusted by Filipinos •
              Fast Shipping • Quality Guaranteed • ⭐ 5-Star Rated • 1000+ Happy
              Customers • Trusted by Filipinos • Fast Shipping • Quality
              Guaranteed
            </div>
          </div>
        </div>
        <div class="reviews-list" id="reviewslist">
          <div class="review-item">
            <div class="review-header">
              <div class="reviewer-info">
                <div class="reviewer-avatar">MT</div>
                <div class="reviewer-details">
                  <div class="author-name">Max the AI</div>
                  <div class="review-date">August 20, 2025</div>
                </div>
              </div>
              <div class="review-rating">
                <span class="star filled">★</span
                ><span class="star filled">★</span
                ><span class="star filled">★</span
                ><span class="star filled">★</span
                ><span class="star filled">★</span>
              </div>
            </div>
            <div class="review-content">
              Amazing product! The quality exceeded my expectations and the
              shipping was incredibly fast. Definitely worth every peso!
            </div>
            <div class="review-media">
              <div
                class="media-item"
              >
                <img
                  src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1"
                  alt="Review image"
                  onerror='this.src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1"'
                />
              </div>
              <div
                class="media-item"
              >
                <img
                  src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1"
                  alt="Review image"
                  onerror='this.src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1"'
                />
              </div>
            </div>
          </div>
        </div>
        <button class="see-more-btn" id="seeMoreBtn">See More Reviews</button>
      </div>
    </section>
`.trim();

    const cssTemplate = `
      .reviews-section {
        background: #0f172a;
        color: #f1f5f9;
        padding: 60px 20px;
        min-height: 100vh;
      }
      .reviews-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      .reviews-header {
        text-align: center;
        margin-bottom: 50px;
        position: relative;
        overflow: hidden;
      }
      .reviews-title {
        font-family: "Sora", sans-serif;
        font-size: 28px;
        font-weight: 700;
        color: #f1f5f9;
        margin-bottom: 10px;
        position: relative;
        z-index: 2;
      }
      .reviews-subtitle {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        color: #94a3b8;
        margin-bottom: 30px;
      }
      .floating-stars {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 1;
      }
      .floating-star {
        position: absolute;
        color: #00b2ff;
        font-size: 20px;
        animation: float 6s ease-in-out infinite;
        opacity: 0.3;
      }
      .floating-star:nth-child(1) {
        top: 10%;
        left: 10%;
        animation-delay: 0s;
      }
      .floating-star:nth-child(2) {
        top: 20%;
        right: 15%;
        animation-delay: 1s;
      }
      .floating-star:nth-child(3) {
        bottom: 30%;
        left: 20%;
        animation-delay: 2s;
      }
      .floating-star:nth-child(4) {
        bottom: 10%;
        right: 10%;
        animation-delay: 3s;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(180deg);
        }
      }
      .trust-marquee {
        background: linear-gradient(90deg, #1e2a38, #0f172a, #1e2a38);
        padding: 15px 0;
        margin: 30px 0;
        overflow: hidden;
        white-space: nowrap;
        border-radius: 10px;
      }
      .marquee-content {
        display: inline-block;
        animation: marquee 20s linear infinite;
        font-family: "Inter", sans-serif;
        font-size: 14px;
        color: #00b2ff;
        font-weight: 500;
      }
      @keyframes marquee {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      .reviews-list {
        display: grid;
        gap: 30px;
        margin-bottom: 40px;
      }
      .review-item {
        background: linear-gradient(135deg, #1e2a38 0%, #0f172a 100%);
        border-radius: 20px;
        padding: 30px;
        border: 1px solid rgba(0, 178, 255, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .review-item:hover {
        transform: translateY(-5px);
        border-color: rgba(0, 178, 255, 0.3);
        box-shadow: 0 20px 40px rgba(0, 178, 255, 0.1);
      }
      .review-item::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #00b2ff, transparent, #00b2ff);
        border-radius: 22px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }
      .review-item:hover::before {
        opacity: 0.1;
      }
      .review-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 15px;
      }
      .reviewer-info {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .reviewer-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00b2ff, #1e2a38);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Sora", sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #f1f5f9;
      }
      .reviewer-details h4 {
        font-family: "Sora", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 5px;
      }
      .review-date {
        font-family: "Inter", sans-serif;
        font-size: 14px;
        color: #94a3b8;
      }
      .review-rating {
        display: flex;
        gap: 3px;
      }
      .star {
        font-size: 16px;
        transition: all 0.2s ease;
      }
      .star.filled {
        color: #ffd700;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
      }
      .star.empty {
        color: #94a3b8;
      }
      .review-content {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #f1f5f9;
        margin-bottom: 20px;
      }
      .review-media {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-top: 20px;
      }
      .media-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .media-item:hover {
        transform: scale(1.05);
      }
      .media-item img,
      .media-item video {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 12px;
      }
      .video-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 178, 255, 0.8);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f1f5f9;
        font-size: 20px;
      }
      .see-more-btn {
        display: block;
        margin: 50px auto 0;
        background: #3871e0;
        color: #ffffff;
        border: none;
        border-radius: 50px;
        padding: 15px 40px;
        font-family: "Inter", sans-serif;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .see-more-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(56, 113, 224, 0.3);
      }
      .see-more-btn:active {
        transform: translateY(0);
      }
      .see-more-btn.loading {
        pointer-events: none;
      }
      .see-more-btn.loading::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid #ffffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 10px;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        justify-content: center;
        align-items: center;
      }
      .lightbox.active {
        display: flex;
      }
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        border-radius: 15px;
        overflow: hidden;
      }
      .lightbox img,
      .lightbox video {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: #f1f5f9;
        font-size: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .lightbox-close:hover {
        color: #00b2ff;
        transform: scale(1.1);
      }
      .no-reviews {
        text-align: center;
        padding: 60px 20px;
        color: #94a3b8;
        font-family: "Inter", sans-serif;
        font-size: 18px;
      }
      .loading-skeleton {
        background: linear-gradient(
          90deg,
          #1e2a38 25%,
          #2a3441 50%,
          #1e2a38 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 12px;
      }
      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
      @media (max-width: 768px) {
        .reviews-section {
          padding: 40px 15px;
        }
        .reviews-title {
          font-size: 24px;
        }
        .review-item {
          padding: 20px;
        }
        .review-header {
          flex-direction: column;
          align-items: flex-start;
        }
        .reviewer-info {
          width: 100%;
        }
        .review-rating {
          margin-top: 10px;
        }
        .review-media {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }
        .media-item img,
        .media-item video {
          height: 150px;
        }
        .see-more-btn {
          width: 100%;
          max-width: 300px;
        }
      }
`.trim();

    setLayoutHtml(htmlTemplate);
    setCssText(cssTemplate);
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

  // Extract the single .review-item template HTML (outerHTML) once layoutHtml is available
  const reviewCardTemplateHtml = useMemo(() => {
    if (!layoutHtml) return null;
    // Use DOMParser (browser) to parse the HTML string and get the first .review-item
    try {
      const doc = new DOMParser().parseFromString(layoutHtml, "text/html");
      const card = doc.querySelector(".review-item");
      return card ? card.outerHTML : null;
    } catch (e) {
      console.error("Failed to parse layoutHtml via DOMParser:", e);
      return null;
    }
  }, [layoutHtml]);

  function renderCardFromTemplate(review, idx) {
    if (!reviewCardTemplateHtml) return null;
    console.log("hello");
    return (
      <React.Fragment key={idx}>
        {parse(reviewCardTemplateHtml, {
          replace: (domNode) => {
            if (!domNode || !domNode.attribs) return;

            const classAttr = domNode.attribs.class || "";
            const classes = classAttr.split(/\s+/).filter(Boolean);

            if (domNode.name === "div" && classes.includes("reviewer-avatar")) {
              const f_name_initial = review.first_name.charAt(0).toUpperCase();
              const l_name_initial = review.last_name.charAt(0).toUpperCase();
              return (
                <div className="reviewer-avatar">
                  {f_name_initial + l_name_initial}
                </div>
              );
            }
            if (domNode.name === "div" && classes.includes("author-name")) {
              return (
                <div className="author-name">
                  {review.first_name + " " + review.last_name}
                </div>
              );
            }
            if (domNode.name === "div" && classes.includes("review-media")) {
              return (
                <RenderMedia
                  images={review.mediaUrls}
                  videos={review.videoUrl}
                />
              );
            }
            if (domNode.name === "div" && classes.includes("review-rating")) {
              return (
                <div className="review-rating">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="star">
                      ⭐
                    </span>
                  ))}
                </div>
              );
            }
            if (domNode.name === "div" && classes.includes("review-date")) {
              return (
                <div className="review-rating">
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              );
            }
            if (domNode.name === "div" && classes.includes("review-content")) {
              return <p className="review-content">{review.content}</p>;
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
      if (classes.includes("reviews-list")) {
        return (
          <div className="reviews-list">
            {reviews.map((r, i) => renderCardFromTemplate(r, i))}
          </div>
        );
      }

      return undefined; // keep other nodes as-is
    },
  });

  return <div>{parsedLayout}</div>;
}
