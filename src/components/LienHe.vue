<template>
  <div class="contact container mb-5">
    <h2>Contact Us</h2>
    <p>If you have any questions, feel free to contact us:</p>

    <div class="contact-info">
      <div class="info-item"><strong>Email:</strong> vul7896@gmail.com</div>
      <div class="info-item"><strong>Phone:</strong> +123 456 789</div>
      <div class="info-item">
        <strong>Facebook:</strong>
        <a
          href="https://www.facebook.com/profile.php?id=100040757753531&locale=en_US"
          target="_blank"
          >Facebook Page</a
        >
      </div>
      <div class="info-item">
        <strong>Zalo:</strong>
        <a
          href="https://www.facebook.com/profile.php?id=100040757753531&locale=en_US"
          target="_blank"
          >Zalo Page</a
        >
      </div>
    </div>

    <div class="contact-form">
      <h3>Send us a message:</h3>
      <form @submit.prevent="submitForm" class="needs-validation" novalidate>
        <div class="form-group">
          <label for="name">Your Name:</label>
          <input
            type="text"
            v-model="formData.name"
            class="form-control"
            required
          />
          <p class="invalid-feedback" v-if="!formData.name">
            Please enter your name.
          </p>
        </div>

        <div class="form-group">
          <label for="email">Your Email:</label>
          <input
            type="email"
            v-model="formData.email"
            class="form-control"
            required
            @input="checkEmail"
          />
          <p class="invalid-feedback" v-if="!isValidEmail">
            Please enter a valid email address.
          </p>
        </div>

        <div class="form-group">
          <label for="message">Your Message:</label>
          <textarea
            v-model="formData.message"
            rows="4"
            class="form-control"
            required
          ></textarea>
          <p class="invalid-feedback" v-if="!formData.message">
            Please enter your message.
          </p>
        </div>

        <button
          type="submit"
          class="btn btn-secondary"
          :disabled="!formData.name || !isValidEmail || !formData.message"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  name: "LienHe",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      isValidEmail: false, //Thêm dòng này
    };
  },
  methods: {
    checkEmail() {
      var emailPattern =
        /^(([^<>()\\.,;:@"]+(\.[^<>()\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.isValidEmail = emailPattern.test(this.formData.email);
    },
    submitForm() {
      // Check if any field in the form is empty
      if (
        !this.formData.name ||
        !this.formData.email ||
        !this.formData.message
      ) {
        alert("Please fill in all the information before sending.");
        return;
      }

      var templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        to_name: "vul7896@gmail.com",
        // Bao gồm địa chỉ email của người gửi trong nội dung tin nhắn
        message: `Bạn nhận được một tin nhắn mới từ ${this.formData.name} (${this.formData.email}):\n\n${this.formData.message}`,
      };

      emailjs
        .send(
          "service_cv1ew7s",
          "template_wx2kccb",
          templateParams,
          "w7xGs00dvA3c5eoQw"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            this.formData = {
              name: "",
              email: "",
              message: "",
            };
            alert("Message sent successfully!");
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
    },
  },
  watch: {
  'formData.email'() {
    this.checkEmail();
  }
},

};
</script>

<style scoped>
/* Your Contact styles here */
.contact {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.contact-info {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.contact-form {
  margin-top: 20px;
}

.contact-form p {
  font-size: 15px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

label {
  margin-bottom: 8px;
}

input,
textarea {
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

button {
  background-color: #ec7546;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d45a30;
}

.invalid-feedback {
  display: block;
  font-size: 12px;
  color: red;
  margin-top: 4px;
}
</style>
