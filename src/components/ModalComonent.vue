<template>
  <div class="modal fade" :id="modalId" role="dialog">
    <div class="modal-dialog" :class="`modal-${size}`">
      <div class="modal-content bg-light">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ title }}</h5>
          <button
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
    title: { type: String, default: "Modal sem Titulo" },
    size: { type: String, default: "md" }
  },

  created() {
    this.$root.$on("Show::Modal", modalId => {
      $(`#${modalId}`).modal("show");
    });

    this.$root.$on("Hide::Modal", modalId => {
      $(`#${modalId}`).modal("hide");
    });
  }
};
</script>
