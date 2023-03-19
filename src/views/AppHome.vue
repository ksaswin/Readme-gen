<template>
  <!-- Home content starts here -->
  <div class='home-content'>
    <h1 class='text main-title'>
      <span> The easiest way to create a </span>
      <span class='readme'> README </span>
    </h1>

    <h3 class='text sub-title'>
      <span>
        This simple editor allows you to quickly add and customize all the
        sections your need for
      </span>
      <span>your project's readme.</span>
    </h3>

    <router-link :to='{ name: "Editor" }'>
      <button class='start-btn'>
        <h4 class='text-btn'>Get Started</h4>
      </button>
    </router-link>

    <img
      src='@/assets/images/readme-light.png'
      alt='Readme-gen screenshot'
      class='screenshot'
    />

    <footer>
      <p>
        Original website created by
        <a :href='katherineTwitter' class='credits'
          >Katherine Peterson</a
        >
      </p>
      <p>
        Cloned by
        <a :href='myGithubProfile' class='credits'>K S Aswin</a>
      </p>
    </footer>
  </div>
  <!-- Home content ends here -->
</template>

<script setup lang='ts'>
const myGithubProfile = import.meta.env.VITE_GITHUB_PROFILE_URI;
const katherineTwitter = import.meta.env.VITE_KATHERINE_TWITTER;
</script>

<style lang='scss' scoped>
.home-content {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 60px;

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 30px 0;
  }

  .main-title {
    font-size: 7vh;
    color: white;

    .readme {
      color: rgb(84, 181, 132);
    }
  }

  .sub-title {
    font-size: 2vh;
    font-weight: 300;
    margin-bottom: 40px;
  }

  .start-btn {
    height: 4vw;
    width: 18vw;

    border: none;
    border-radius: 10px;
    background: rgb(84, 181, 132);
    cursor: pointer;

    .text-btn {
      margin: 0;
      color: white;
      font-size: 2vw;
    }
  }

  .screenshot {
    margin-top: 50px;
    width: 80vw;
    border: 1px solid white;
    border-radius: 10px;
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 60px 0 50px 0;

    p {
      font-size: 12px;
      color: rgb(200, 200, 200);
      margin: 5px;

      .credits {
        color: rgb(200, 200, 200);

        &:hover {
          color: rgb(84, 181, 132);
        }
      }
    }
  }
}
</style>
