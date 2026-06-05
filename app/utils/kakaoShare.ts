export interface KakaoShareParams {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  url: string;
}

export function shareToKakao({
  title,
  description,
  imageUrl,
  buttonText,
  url,
}: KakaoShareParams) {
  if (typeof window === "undefined") return;

  const kakao = (window as any).Kakao;
  if (!kakao) {
    console.error("Kakao SDK not loaded yet.");
    return;
  }

  // Initialize Kakao SDK if not already done
  if (!kakao.isInitialized()) {
    try {
      kakao.init("d5745b5e1623229be8701723aa5f3bb4");
    } catch (e) {
      console.error("Kakao SDK initialization failed:", e);
      return;
    }
  }

  try {
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: buttonText,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  } catch (error) {
    console.error("Kakao Share Error:", error);
  }
}
