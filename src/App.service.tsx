export const fetchUserStories = async () => {
  try {
    const result = await fetch("/sample-data/data.json")
    return result.json()
  } catch (err) {
    console.log(err);
  }
};
