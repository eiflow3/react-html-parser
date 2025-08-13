// RelatedProductsTemplateRenderer.jsx
import React, { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";

function RenderRelatedProductMedia({ image }) {
  return (
    <div className="related-product-image">
      <img src={image} alt="Related product" />
    </div>
  );
}

export default function RelatedProductsTemplateRenderer() {
  const [layoutHtml, setLayoutHtml] = useState("");
  const [cssText, setCssText] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch related products data
  useEffect(() => {
    fetch("/related_products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading related products:", err));
  }, []);

  // Load HTML & CSS template (empty placeholders for now)
  useEffect(() => {
    const htmlTemplate = `
          <section class="related-section-container">
      <div class="related-section-content">
        <div class="related-section-header">
          <h2 class="related-section-title">You Might Also Like</h2>
          <p class="related-section-subtitle">
            Discover more products from our streetwear collection
          </p>
        </div>
        <div class="related-section-carousel-container">
          <button
            class="related-section-nav-button related-section-prev"
            id="relatedProductsPrevBtn"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <div
            class="related-section-carousel-wrapper related-product-list"
            id="relatedProductsCarousel"
          >
            <div
              class="related-product-item"
              data-product-id="67e0fd22e6f94d5022d5c597"
              data-slug="-district-cap"
            >
              <img
                class="related-product-image"
                src="https://p1media.prosperna.ph/media%2F67dd1ac4aa2b8fd7a74027c5%2F1742798272331-cap-red.webp"
                alt="District Cap"
              />
              <div class="related-section-product-info">
                <h3 class="related-product-name">District Cap</h3>
                <p class="related-product-short-description">
                  Urban attitude with embroidered logo and adjustable strap
                </p>
                <div class="related-product-price">₱950</div>
                <div class="related-section-product-rating">
                  <div class="related-product-star-rating">
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                  </div>
                  <span class="related-product-review-count">(0 reviews)</span>
                </div>
              </div>
            </div>
            <div
              class="related-product-item"
              data-product-id="67e0ffdde6f94d5022d5e586"
              data-slug="echo-hoodie"
            >
              <img
                class="related-product-image"
                src="https://p1media.prosperna.ph/media%2F67dd1ac4aa2b8fd7a74027c5%2F1742799082056-pants-cargo.webp"
                alt="Echo Hoodie"
              />
              <div class="related-section-product-info">
                <h3 class="related-product-name">Echo Hoodie</h3>
                <p class="related-product-short-description">
                  Reflective statement with subtle details that catch the light
                </p>
                <div class="related-product-price">₱2,400</div>
                <div class="related-section-product-rating">
                  <div class="related-product-star-rating">
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                  </div>
                  <span class="related-product-review-count">(0 reviews)</span>
                </div>
              </div>
            </div>
            <div
              class="related-product-item"
              data-product-id="67e0fed1e6f94d5022d5d854"
              data-slug="blank-canvas-tee"
            >
              <img
                class="related-product-image"
                src="https://p1media.prosperna.ph/media%2F67dd1ac4aa2b8fd7a74027c5%2F1742798881303-shirt-white.webp"
                alt="Blank Canvas Tee"
              />
              <div class="related-section-product-info">
                <h3 class="related-product-name">Blank Canvas Tee</h3>
                <p class="related-product-short-description">
                  The ultimate essential crafted from premium cotton
                </p>
                <div class="related-product-price">₱1,200</div>
                <div class="related-section-product-rating">
                  <div class="related-product-star-rating">
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                  </div>
                  <span class="related-product-review-count">(0 reviews)</span>
                </div>
              </div>
            </div>
            <div
              class="related-product-item"
              data-product-id="67e0feb3e6f94d5022d5d7d1"
              data-slug="blueprint-long-sleeve"
            >
              <img
                class="related-product-image"
                src="https://p1media.prosperna.ph/media%2F67dd1ac4aa2b8fd7a74027c5%2F1742798603419-sleeve-red.webp"
                alt="Blueprint Long Sleeve"
              />
              <div class="related-section-product-info">
                <h3 class="related-product-name">
                  Blueprint Long Sleeve
                </h3>
                <p class="related-product-short-description">
                  Essential layering piece with minimalist design
                </p>
                <div class="related-product-price">₱1,500</div>
                <div class="related-section-product-rating">
                  <div class="related-product-star-rating">
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                  </div>
                  <span class="related-product-review-count">(0 reviews)</span>
                </div>
              </div>
            </div>
            <div
              class="related-product-item"
              data-product-id="67e0f985e6f94d5022d5beec"
              data-slug="skyline-hoodie"
            >
              <img
                class="related-product-image"
                src="https://p1media.prosperna.ph/media%2F67dd1ac4aa2b8fd7a74027c5%2F1742797272391-cap-ble.webp"
                alt="Skyline Jacket"
              />
              <div class="related-section-product-info">
                <h3 class="related-product-name">Skyline Jacket</h3>
                <p class="related-product-short-description">
                  Elevated comfort with premium fleece and skyline graphic
                </p>
                <div class="related-product-price">₱2,200</div>
                <div class="related-section-product-rating">
                  <div class="related-product-star-rating">
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                  </div>
                  <span class="related-product-review-count">(0 reviews)</span>
                </div>
              </div>
            </div>
            <div
              class="related-product-item"
              data-product-id="67e0b058e6f94d5022d2cc85"
              data-slug="utility-cargo-pants"
            >
              <img
                class="related-product-image"
                src="https://p1media.prosperna.ph/media%2F67dd1ac4aa2b8fd7a74027c5%2F1742778614732-pants-cargo.webp"
                alt="Utility Cargo Pants"
              />
              <div class="related-section-product-info">
                <h3 class="related-product-name">
                  Utility Cargo Pants
                </h3>
                <p class="related-product-short-description">
                  Street-ready storage with durable construction
                </p>
                <div class="related-product-price">₱1,000</div>
                <div class="related-section-product-rating">
                  <div class="related-product-star-rating">
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                    <i class="fas fa-star related-section-star-empty"></i>
                  </div>
                  <span class="related-product-review-count">(0 reviews)</span>
                </div>
              </div>
            </div>
          </div>
          <button
            class="related-section-nav-button related-section-next"
            id="relatedProductsNextBtn"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="related-section-see-more">
          <button
            class="related-section-see-more-button"
            id="relatedProductsSeeMoreBtn"
          >
            <i class="fas fa-grid-2 related-section-icon"></i> See All Products
          </button>
        </div>
      </div>
    </section>
    `.trim();

    const cssTemplate = `
         .related-section-container {
        width: 100%;
        background-color: #0f172a;
        padding: 60px 20px;
        font-family: "Inter", sans-serif;
      }
      .related-section-content {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
      }
      .related-section-header {
        text-align: center;
        margin-bottom: 50px;
      }
      .related-section-title {
        font-family: "Sora", sans-serif;
        font-size: 28px;
        font-weight: 700;
        color: #f1f5f9;
        margin-bottom: 10px;
      }
      .related-section-subtitle {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        font-weight: 400;
        color: #94a3b8;
      }
      .related-section-carousel-container {
        position: relative;
        overflow: hidden;
        margin-bottom: 40px;
        padding: 0 60px;
      }
      .related-product-list {
        display: flex;
        transition: transform 0.3s ease;
        gap: 20px;
      }
      .related-product-item {
        flex: 0 0 300px;
        background: #1e2a38;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .related-product-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 178, 255, 0.15);
      }
      .related-product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }
      .related-section-product-info {
        padding: 20px;
      }
      .related-product-name {
        font-family: "Sora", sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }
      .related-product-short-description {
        font-size: 14px;
        color: #94a3b8;
        margin-bottom: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }
      .related-product-price {
        font-family: "Sora", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: #00b2ff;
        margin-bottom: 12px;
      }
      .related-section-product-rating {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .related-product-star-rating {
        display: flex;
        gap: 2px;
      }
      .related-section-star {
        color: #fcd34d;
        font-size: 14px;
      }
      .related-section-star-empty {
        color: #4b5563;
        font-size: 14px;
      }
      .related-product-review-count {
        font-size: 12px;
        color: #94a3b8;
      }
      .related-section-nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #00b2ff;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .related-section-nav-button:hover {
        background: #0094d9;
        transform: translateY(-50%) scale(1.1);
      }
      .related-section-nav-button:disabled {
        background: #4b5563;
        cursor: not-allowed;
        transform: translateY(-50%);
      }
      .related-section-prev {
        left: 0;
      }
      .related-section-next {
        right: 0;
      }
      .related-section-see-more {
        text-align: center;
      }
      .related-section-see-more-button {
        background-color: #3871e0;
        color: #ffffff;
        border: none;
        border-radius: 50px;
        padding: 10px 30px;
        font-family: "Sora", sans-serif;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
      }
      .related-section-see-more-button:hover {
        background-color: #2563eb;
        transform: translateY(-2px);
      }
      @media (max-width: 768px) {
        .related-section-container {
          padding: 40px 15px;
        }
        .related-section-title {
          font-size: 24px;
        }
        .related-section-carousel-container {
          padding: 0 50px;
        }
        .related-product-item {
          flex: 0 0 280px;
        }
        .related-section-nav-button {
          width: 40px;
          height: 40px;
          font-size: 14px;
        }
      }
      @media (max-width: 480px) {
        .related-section-carousel-container {
          padding: 0 45px;
        }
        .related-product-item {
          flex: 0 0 250px;
        }
        .related-section-product-info {
          padding: 15px;
        }
        .related-product-name {
          font-size: 16px;
        }
        .related-product-price {
          font-size: 18px;
        }
        .related-section-nav-button {
          width: 35px;
          height: 35px;
          font-size: 12px;
        }
      }
    `.trim();

    setLayoutHtml(htmlTemplate);
    setCssText(cssTemplate);
  }, []);

  // Inject CSS into <head>
  useEffect(() => {
    if (!cssText) return;
    const style = document.createElement("style");
    style.dataset.generatedBy = "related-products-template-renderer";
    style.innerHTML = cssText;
    document.head.appendChild(style);
    return () => style.remove();
  }, [cssText]);

  // Extract the single .related-product-item template HTML
  const productCardTemplateHtml = useMemo(() => {
    if (!layoutHtml) return null;
    try {
      const doc = new DOMParser().parseFromString(layoutHtml, "text/html");
      const card = doc.querySelector(".related-product-item");
      return card ? card.outerHTML : null;
    } catch (e) {
      console.error("Failed to parse layoutHtml:", e);
      return null;
    }
  }, [layoutHtml]);

  function renderCardFromTemplate(product, idx) {
    if (!productCardTemplateHtml) return null;
    return (
      <React.Fragment key={idx}>
        {parse(productCardTemplateHtml, {
          replace: (domNode) => {
            if (!domNode || !domNode.attribs) return;
            const classAttr = domNode.attribs.class || "";
            const classes = classAttr.split(/\s+/).filter(Boolean);

            if (domNode.name === "img" && classes.includes("related-product-image")) {
                console.log(product.product_specification.images[0].image)
              return <img className="related-product-image" src={product.product_specification.images[0].image} alt=""/>;
            }
            if (domNode.name === "h3" && classes.includes("related-product-name")) {
              return <div className="related-product-name">{product.product_specification.name}</div>;
            }
            if (domNode.name === "div" && classes.includes("related-product-price")) {
              return <div className="related-product-price">${product.product_price.regular_price}</div>;
            }
            if (domNode.name === "p" && classes.includes("related-product-short-description")) {
              return (
                <p className="related-product-short-description">
                  {product.product_specification.short_description}
                </p>
              );
            }
            if (domNode.name === "div" && classes.includes("related-product-star-rating")) {
              return (
                <div className="related-product-star-rating">
                  {Array.from({ length: product.rating }, (_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
              );
            }
            if (domNode.name === "span" && classes.includes("related-product-review-count")) {
              return (
                <div className="related-product-review-count">
                  {product.reviewCount} reviews
                </div>
              );
            }
            if (domNode.name === "button" && classes.includes("related-product-see-more")) {
              return (
                <button className="related-product-see-more">
                  <a href={product.url}>See More</a>
                </button>
              );
            }

            return undefined;
          },
        })}
      </React.Fragment>
    );
  }

  // Parse layout HTML and replace related-product-list with dynamic products
  if (!layoutHtml) return <div>Loading related products…</div>;

  const parsedLayout = parse(layoutHtml, {
    replace: (domNode) => {
      if (!domNode || !domNode.attribs) return;
      const classAttr = domNode.attribs.class || "";
      const classes = classAttr.split(/\s+/).filter(Boolean);

      if (classes.includes("related-product-list")) {
        return (
          <div className="related-product-list">
            {products.map((p, i) => renderCardFromTemplate(p, i))}
          </div>
        );
      }
      return undefined;
    },
  });

  return <div>{parsedLayout}</div>;
}