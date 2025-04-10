import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default SEO;
