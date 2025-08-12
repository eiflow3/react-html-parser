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
    <div class="reviews-container">
        <div class="reviews-header">
            <h2>Customer Reviews</h2>
            <p>See what our customers are saying</p>
        </div>
        
        <div class="reviews-list">
            <!-- Michael Santos Review -->
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">MS</div>
                        <div>
                            <div class="reviewer-name">Michael Santos</div>
                            <div class="review-date">February 28, 2025</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star empty">★</span>
                    </div>
                </div>
                <div class="review-content">
                    This was so cheap and worth every penny!
                </div>
                <div class="review-media">
                    <div class="media-item">
                        <img src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1" alt="Review image">
                    </div>
                    <div class="media-item">
                        <img src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1" alt="Review image">
                    </div>
                    <div class="media-item">
                        <video src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1" controls></video>
                    </div>
                </div>
            </div>

            <!-- Sarah Johnson Review -->
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">SJ</div>
                        <div>
                            <div class="reviewer-name">Sarah Johnson</div>
                            <div class="review-date">March 5, 2025</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                    </div>
                </div>
                <div class="review-content">
                    The quality exceeded my expectations.
                </div>
                <div class="review-media">
                    <div class="media-item">
                        <img src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1" alt="Review image">
                    </div>
                    <div class="media-item">
                        <img src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1" alt="Review image">
                    </div>
                    <div class="media-item">
                        <video src="https://i0.wp.com/shawnkirchner.com/wp-content/uploads/2022/06/wireframe-placeholder.png?ssl=1" controls></video>
                    </div>
                </div>
            </div>
        </div>
    </div>
`.trim();

    const cssTemplate = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            padding: 20px;
            line-height: 1.6;
        }

        .reviews-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .reviews-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .reviews-header h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .reviews-header p {
            opacity: 0.9;
            font-size: 1.1rem;
        }

        .reviews-list {
            padding: 30px;
        }

        .review-item {
            border-bottom: 1px solid #e9ecef;
            padding: 25px 0;
            transition: transform 0.2s ease;
        }

        .review-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .review-item:hover {
            transform: translateY(-2px);
        }

        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .reviewer-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .reviewer-avatar {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .reviewer-name {
            font-weight: 600;
            color: #333;
            font-size: 1.1rem;
        }

        .review-date {
            color: #6c757d;
            font-size: 0.9rem;
        }

        .rating {
            display: flex;
            gap: 2px;
        }

        .star {
            color: #ffc107;
            font-size: 1.2rem;
        }

        .star.empty {
            color: #e9ecef;
        }

        .review-content {
            color: #495057;
            font-size: 1rem;
            margin-bottom: 20px;
            line-height: 1.7;
        }

        .review-media {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .media-item {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
        }

        .media-item:hover {
            transform: scale(1.05);
        }

        .media-item img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            display: block;
        }

        .media-item video {
            width: 150px;
            height: 100px;
            object-fit: cover;
            display: block;
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }

            .reviews-container {
                margin: 0;
                border-radius: 0;
            }

            .reviews-header {
                padding: 20px;
            }

            .reviews-header h2 {
                font-size: 1.5rem;
            }

            .reviews-list {
                padding: 20px;
            }

            .review-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }

            .media-item img,
            .media-item video {
                width: 80px;
                height: 80px;
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

  // Extract the single .review-card template HTML (outerHTML) once layoutHtml is available
  const reviewCardTemplateHtml = useMemo(() => {
    if (!layoutHtml) return null;
    // Use DOMParser (browser) to parse the HTML string and get the first .review-card
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
            if (domNode.name === "div" && classes.includes("reviewer-name")) {
              return (
                <div className="reviewer-name">
                  {review.first_name + " " + review.last_name}
                </div>
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
