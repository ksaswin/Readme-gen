<template>
  <div class="not-found">
    <h1 class="error-code">
      <span> 4 </span>
      <img
        class="donut-img"
        src="@/assets/images/donut.png"
        alt="Donut image"
      />
      <span> 4 </span>
    </h1>

    <h4 class="message">Oops! We couldn't find what you're looking for.</h4>
    <h4 class="message">Fancy a 🍩 ?</h4>
    <div class="link-back">
      <router-link :to="{ name: 'Home' }">
        <button class="go-back">Home</button>
      </router-link>
      <router-link :to="{ name: 'Editor' }">
        <button class="go-back">Editor</button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: rgb(239, 136, 177);

  .error-code {
    display: flex;
    align-items: center;
    margin: 0;
    font-size: 50vh;

    .donut-img {
      margin: 0 10px 0 10px;
      width: 35vh;
    }
  }

  .message {
    margin: 0;
    font-size: 20px;
  }

  .go-back {
    margin: 30px 10px 10px 10px;
    width: 130px;
    height: 50px;
    border: none;
    border-radius: 20px;

    cursor: pointer;
    font-size: 15px;

    &:hover {
      background: rgb(84, 181, 132);
      color: white;
    }
  }
}
</style>
