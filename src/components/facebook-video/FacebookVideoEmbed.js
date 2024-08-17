import React from "react";

const FacebookVideoEmbed = ({ videoUrl }) => {
  return (
    <div className="facebook-video">
      <iframe
        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          videoUrl
        )}`}
        width="500"
        height="315"
        style={{ border: "none", overflow: "hidden" }}
        allowFullScreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default FacebookVideoEmbed;
