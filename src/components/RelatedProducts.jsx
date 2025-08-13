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
<section class='related-section-container'> <div class='related-section-wrapper'> <div class='related-section-header'> <h2 class='related-section-title'>You Might Also Like</h2> <p class='related-section-subtitle'>Discover more amazing products carefully selected just for you</p> </div> <div class='related-product-list'> <div class='related-product-item' data-product-id='64f7fc53546489a84a8961e2'> <div class='related-section-badge'>Best Seller</div> <div class='related-section-product-content'> <img class='related-product-image' src='https://p1media.prosperna.ph/business%2Fstore%2Fmaric100%2F1693973728704-JWK_STABILIZER_CLEAR_1080x.jpg' alt='JWK Screw-In Stabilizers Set'> <h3 class='related-product-name'>JWK Screw-In Stabilizers Set</h3> <p class='related-product-short-description'>Smooth typing, effortless comfort.</p> <div class='related-section-rating-container'> <div class='related-product-star-rating'> <i class='fas fa-star related-section-star active'></i> <i class='fas fa-star related-section-star active'></i> <i class='fas fa-star related-section-star active'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> </div> <span class='related-product-review-count'>(1 review)</span> </div> <div class='related-product-price'>₱1,100</div> <button class='related-section-add-to-cart'> <i class='fas fa-shopping-cart'></i> Add to Cart </button> </div> </div> <div class='related-product-item' data-product-id='675921f99ace390d45f4dfc3'> <div class='related-section-badge'>New</div> <div class='related-section-product-content'> <img class='related-product-image' src='https://p1media.prosperna.ph/media%2F63dc812b809e8c308d735e72%2F1722314582528-251.jpg' alt='DIgital Card'> <h3 class='related-product-name'>DIgital Card</h3> <p class='related-product-short-description'>Digital</p> <div class='related-section-rating-container'> <div class='related-product-star-rating'> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> </div> <span class='related-product-review-count'>(0 reviews)</span> </div> <div class='related-product-price'>₱1,000</div> <button class='related-section-add-to-cart'> <i class='fas fa-shopping-cart'></i> Add to Cart </button> </div> </div> <div class='related-product-item' data-product-id='64f7cb1f3862ed2a8684f49a'> <div class='related-section-badge'>Featured</div> <div class='related-section-product-content'> <img class='related-product-image' src='https://p1media.prosperna.ph/media%2F63dc812b809e8c308d735e72%2F1754985301661-ChatGPT%20Image%20Aug%2012%2C%202025%2C%2003_31_27%20PM.webp' alt='KBDFans 67 Lite Barebone Keyboard'> <h3 class='related-product-name'>KBDFans 67 Lite Barebone Keyboard</h3> <p class='related-product-short-description'>Express your style with iconic keyboard design!</p> <div class='related-section-rating-container'> <div class='related-product-star-rating'> <i class='fas fa-star related-section-star active'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> <i class='fas fa-star related-section-star'></i> </div> <span class='related-product-review-count'>(3 reviews)</span> </div> <div class='related-product-price'>₱15,000</div> <button class='related-section-add-to-cart'> <i class='fas fa-shopping-cart'></i> Add to Cart </button> </div> </div> </div> <div class='related-section-see-all-container'> <button class='related-section-see-all-btn' id='relatedProductsSeeAllBtn'> <span>See All Products</span> <i class='fas fa-arrow-right'></i> </button> </div> </div> </section>

    `.trim();

    const cssTemplate = `
.related-section-container { background-color: #0F172A; padding: 60px 20px; width: 100%; } .related-section-wrapper { max-width: 1200px; margin: 0 auto; } .related-section-header { text-align: center; margin-bottom: 50px; } .related-section-title { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700; color: #F1F5F9; margin-bottom: 15px; } .related-section-subtitle { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: #94A3B8; margin-bottom: 30px; } .related-product-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 50px; } .related-product-item { background: linear-gradient(135deg, #1E2A38 0%, #0F172A 100%); border-radius: 20px; padding: 25px; transition: all 0.3s ease; cursor: pointer; border: 2px solid transparent; position: relative; overflow: hidden; } .related-product-item::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, #00B2FF, #3871E0); opacity: 0; transition: opacity 0.3s ease; z-index: 1; border-radius: 18px; } .related-product-item:hover::before { opacity: 0.1; } .related-product-item:hover { transform: translateY(-10px); border-color: #00B2FF; box-shadow: 0 20px 40px rgba(0, 178, 255, 0.2); } .related-section-product-content { position: relative; z-index: 2; } .related-product-image { width: 100%; height: 200px; object-fit: cover; border-radius: 15px; margin-bottom: 20px; transition: transform 0.3s ease; } .related-product-item:hover .related-product-image { transform: scale(1.05); } .related-product-name { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 600; color: #F1F5F9; margin-bottom: 10px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .related-product-short-description { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: #94A3B8; margin-bottom: 15px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .related-section-rating-container { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; } .related-product-star-rating { display: flex; gap: 3px; } .related-section-star { color: #94A3B8; font-size: 16px; transition: color 0.2s ease; } .related-section-star.active { color: #FFD700; } .related-product-review-count { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: #94A3B8; } .related-product-price { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; color: #00B2FF; margin-bottom: 20px; } .related-section-add-to-cart { width: 100%; background: linear-gradient(135deg, #3871E0, #00B2FF); color: #ffffff; border: none; border-radius: 50px; padding: 12px 30px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; } .related-section-add-to-cart::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease; } .related-section-add-to-cart:hover::before { left: 100%; } .related-section-add-to-cart:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(56, 113, 224, 0.4); } .related-section-see-all-container { text-align: center; margin-top: 40px; } .related-section-see-all-btn { background: linear-gradient(135deg, #3871E0, #00B2FF); color: #ffffff; border: none; border-radius: 50px; padding: 15px 40px; font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 10px; } .related-section-see-all-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease; } .related-section-see-all-btn:hover::before { left: 100%; } .related-section-see-all-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(56, 113, 224, 0.4); } .related-section-badge { position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #00B2FF, #3871E0); color: #ffffff; padding: 5px 12px; border-radius: 20px; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; z-index: 3; } @media (max-width: 768px) { .related-section-container { padding: 40px 15px; } .related-section-title { font-size: 24px; } .related-product-list { grid-template-columns: 1fr; gap: 20px; } .related-product-item { padding: 20px; } .related-product-image { height: 180px; } .related-product-name { font-size: 20px; } .related-section-see-all-btn { font-size: 16px; padding: 12px 30px; } } @media (max-width: 480px) { .related-section-title { font-size: 22px; } .related-product-item { padding: 15px; } .related-product-image { height: 160px; } .related-product-name { font-size: 18px; } .related-product-price { font-size: 20px; } }

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
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(link);
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

            if (
              domNode.name === "img" &&
              classes.includes("related-product-image")
            ) {
              console.log(product.product_specification.images[0].image);
              return (
                <img
                  className="related-product-image"
                  src={product.product_specification.images[0].image}
                  alt=""
                />
              );
            }
            if (
              domNode.name === "h3" &&
              classes.includes("related-product-name")
            ) {
              return (
                <div className="related-product-name">
                  {product.product_specification.name}
                </div>
              );
            }
            if (
              domNode.name === "div" &&
              classes.includes("related-product-price")
            ) {
              return (
                <div className="related-product-price">
                  ${product.product_price.regular_price}
                </div>
              );
            }
            if (
              domNode.name === "p" &&
              classes.includes("related-product-short-description")
            ) {
              return (
                <p className="related-product-short-description">
                  {product.product_specification.short_description}
                </p>
              );
            }
            if (
              domNode.name === "div" &&
              classes.includes("related-product-star-rating")
            ) {
              const filledStars = Math.round(+product.rating.toFixed(2));
              const emptyStars = 5 - filledStars;

              return (
                <div className="related-product-star-rating">
                  {Array.from({ length: filledStars }, (_, i) => (
                    <i
                      key={`filled-${i}`}
                      className="fas fa-star related-section-star"
                    ></i>
                  ))}
                  {Array.from({ length: emptyStars }, (_, i) => (
                    <i
                      key={`empty-${i}`}
                      className="fas fa-star related-section-star empty"
                    ></i>
                  ))}
                </div>
              );
            }
            if (
              domNode.name === "span" &&
              classes.includes("related-product-review-count")
            ) {
              return (
                <div className="related-product-review-count">
                  {product.reviewCount > 0
                    ? product.reviewCount + "reviews"
                    : "No reviews yet."}
                </div>
              );
            }
            if (
              domNode.name === "button" &&
              classes.includes("related-product-see-more")
            ) {
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
