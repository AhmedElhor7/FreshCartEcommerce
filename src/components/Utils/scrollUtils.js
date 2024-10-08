
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

export function removeProductIdFromLocalStorage(productId) {
  // Step 1: Retrieve the existing array from localStorage
  const productIds = JSON.parse(localStorage.getItem("productIds")) || [];

  // Step 2: Filter out the specific product ID
  const updatedProductIds = productIds.filter((id) => id !== productId);

  // Step 3: Save the updated array back to localStorage
  localStorage.setItem("productIds", JSON.stringify(updatedProductIds));
}

export function removeWishListIdFromLocalStorage(wishListId) {
  // Step 1: Retrieve the existing array from localStorage
  const wishListIds = JSON.parse(localStorage.getItem("wishList")) || [];

  // Step 2: Filter out the specific product ID
  const updatedWishListId = productIds.filter((id) => id !== wishListIds);

  // Step 3: Save the updated array back to localStorage
  localStorage.setItem("wishList", JSON.stringify(updatedWishListId));
}

  