const form = document.querySelector(".create-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get("message");
    const body = { message };
    try {
        const res = await fetch("http://localhost:8080/tweets", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "TWITTER_LITE_ACCESS_TOKEN"
                )}`,
            },
        });
        if (res.status === 401) {
            window.location.href = "/log-in";
            return;
        } else {
            // pass
        }
        if (!res.ok) {
            throw res;
        }
        form.reset();
        await fetchTweets();
    } catch (err) {
        handleErrors(err);
    }
});