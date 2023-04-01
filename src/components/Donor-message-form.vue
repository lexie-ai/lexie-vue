<template>
  <v-sheet class="py-16" color="#1818181a">
    <section id="grid">
      <v-container>
        <v-row justify="space-between">
          <v-sheet width="400" class="mx-auto">
            <v-form
              v-if="isMessageValid"
              validate-on="submit"
              @submit.prevent="submit"
            >
              <v-textarea
                v-model="message"
                :rules="messageRules"
                label="Message"
              ></v-textarea>
              <v-text-field
                type="number"
                :rules="donorIdRule"
                v-model="donorId"
                label="Donor Id"
              ></v-text-field>
              <v-btn type="submit" block class="mt-2">Send</v-btn>
            </v-form>
          </v-sheet>
        </v-row>
      </v-container>
    </section>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Donor-message-form",
  data() {
    return {
      message: null,
      messageRules: [
        (message) => !!message || "Message is required",
        (message) =>
          (message && message.length >= 15) ||
          "Message must be more than 15 characters",
      ],
      messageErrors: [],
      donorId: null,
      donorIdRule: [(donorId) => !!donorId || "Donor ID is required"],
    };
  },
  computed: {
    isMessageValid() {
      const errors = this.messageRules
        .map((rule) => rule(this.message))
        .filter((error) => error);
      return errors.length;
    },
  },
  methods: {
    ...mapActions(["sendMessageToDonors"]),
    async submit() {
      this.$store.dispatch("sendMessageToDonors", {
        params: { donorId: this.donorId },
        data: { message: this.message },
      });
    },
  },
};
</script>

<style scoped></style>
