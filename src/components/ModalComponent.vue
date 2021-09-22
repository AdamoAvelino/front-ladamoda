<template>
  <div
    class="modal fade"
    :id="modalId"
    role="dialog"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div class="modal-dialog" :class="`modal-${size}`">
      <div class="modal-content bg-light">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            v-if="buttonClose"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "ModalComponent",
  props: {
    modalId: { type: String, default: "modal" },
    modalIdDependent: { type: String, default: "" },
    title: { type: String, default: "Modal sem Titulo" },
    size: { type: String, default: "md" },
    buttonClose: { type: Boolean, default: true }
  },

  data: () => {
    return {
      open: false
    };
  },

  created() {
    this.$root.$on("Show::Modal", modalId => {
      this.open = true;
      $(`#${modalId}`).modal("show");
      return this.open;
    });

    this.$root.$on("Hide::Modal", modalId => {
      this.open = false;
      $(`#${modalId}`).modal("hide");
      return this.open;
    });
  },

  mounted() {
    $(`#${this.modalId}`).on("hidden.bs.modal", () => {
      if (this.modalIdDependent) {
        $(`#${this.modalIdDependent}`).modal("show");
      }
    });

    if (this.modalIdDependent) {
      $(`#${this.modalId}`).on("shown.bs.modal", () => {
        $(`#${this.modalIdDependent}`).modal("hide");
        setTimeout(() => {
          $("body").addClass("modal-open");
        }, 500);
      });
    }
  }
};
</script>
