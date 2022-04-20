<template>
  <!-- Top header section starts here -->
  <div class="header-wrapper">
    <!-- Title and subtitle -->
    <div class="app-name">
      <router-link :to="{ name: 'Home' }" class="md-logo">
        <img src="@/assets/icons/markdown.png" alt="readme gen logo" />
      </router-link>
      <p>A <a href="https://readme.so/editor">readme.so</a> clone</p>
    </div>
    <!-- Title and subtitle -->

    <!-- Github link -->
    <div class="header-buttons-div">
      <button class="header-btn">
        <a href="https://github.com/ksaswin/Readme-gen">
          <img class="github-img" src="@/assets/icons/github.svg" alt=""
        /></a>
      </button>
    </div>
    <!-- Github link -->
  </div>
  <!-- Top header section starts here -->

  <!-- Home content starts here -->
  <div class="home-content">
    <!-- Main title -->
    <h1 class="text main-title">
      <span> The easiest way to create a </span>
      <span class="readme"> README </span>
    </h1>
    <!-- Main title -->

    <!-- Sub title -->
    <h3 class="text sub-title">
      <span>
        This simple editor allows you to quickly add and customize all the
        sections your need for
      </span>
      <span>your project's readme.</span>
    </h3>
    <!-- Sub title -->

    <!-- Link to editor page -->
    <router-link :to="{ name: 'Editor' }">
      <button class="start-btn">
        <h4 class="text-btn">Get Started</h4>
      </button>
    </router-link>
    <!-- Link to editor page -->

    <img
      src="@/assets/images/readme-light.png"
      alt="Readme-gen screenshot"
      class="screenshot"
    />

    <footer>
      <p>
        Original website created by
        <a href="https://twitter.com/katherinecodes" class="credits"
          >Katherine Peterson</a
        >
      </p>
      <p>
        Cloned by
        <a href="https://github.com/ksaswin" class="credits">K S Aswin</a>
      </p>
    </footer>
  </div>
  <!-- Home content ends here -->
</template>

<style lang="scss" scoped>
@import "../styles/headers";

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
