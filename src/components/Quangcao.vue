<template>
    <div class="quangcao container-fluid">
      <h2>Black Friday Countdown</h2>
      <div class="countdown">
        <div class="time-block">
          <span class="time">{{ days }}</span>
          <span class="unit">Day</span>
        </div>
        <div class="time-block">
          <span class="time">{{ hours }}</span>
          <span class="unit">Hour</span>
        </div>
        <div class="time-block">
          <span class="time">{{ minutes }}</span>
          <span class="unit">Minute</span>
        </div>
        <div class="time-block">
          <span class="time">{{ seconds }}</span>
          <span class="unit">Second</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuangCao',
    data() {
      return {
        countdownDate: new Date("2024-10-29T00:00:00Z"),
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        countdownInterval: null,
      };
    },
    methods: {
      updateCountdown() {
        const now = new Date().getTime();
        const distance = this.countdownDate - now;
  
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        if (distance < 0) {
          clearInterval(this.countdownInterval);
          this.days = this.hours = this.minutes = this.seconds = 0;
        }
      },
    },
    mounted() {
      this.countdownInterval = setInterval(this.updateCountdown, 1000);
    },
    beforeUnmount() {
      clearInterval(this.countdownInterval);
    },
  };
  </script>
  
  <style scoped>
  .quangcao {
    margin-top: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .time-block {
    padding: 30px;
    margin: 0 20px;
    text-align: center;
  }
  
  .time {
    font-size: 48px;
    font-weight: bold;
    color: white; /* Red color */
  }
  
  .unit {
    font-size: 20px;
    margin-top: 10px;
    color: white; /* Dark gray color */
  }
  </style>
  