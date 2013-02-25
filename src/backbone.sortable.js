var SortableItemView = Backbone.View.extend({
    tagName: "li",

    attributes: {
        "draggable": true
    },

    events: {
        "dragstart": "start",
        "dragenter": "enter",
        "dragleave": "leave",
        "dragend": "leave",
        "dragover": "over",
        "drop": "drop"
    },

    initialize: function (options) {
        _.extend(this, options);
    },

    render: function () {
        this.$el.html(_.template(this.template, this.model.toJSON()));
        return this;
    },

    start: function () {
        this.parent.draggedModel = this.model;
    },

    enter: function () {
        this.$el.addClass(this.overClass);
    },

    leave: function () {
        this.$el.removeClass(this.overClass);
    },

    over: function (event) {
        event.preventDefault();
    },

    drop: function () {
        this.leave();
        var collection = this.parent.model;
        collection.models.splice(collection.indexOf(this.parent.draggedModel), 1);
        collection.models.splice(this.$el.index(), 0, this.parent.draggedModel);
        _.forEach(collection.models, function (model, index) {
            model.set(this.orderField, index+1, {silent: true});
        }, this);
        collection.trigger("change");
    }

});

var SortableView = Backbone.View.extend({

    tagName: "ul",

    orderField: "order",
    overClass: "over",
    itemTemplate: "",

    initialize: function (options) {
        _.extend(this, options);
        this.model.on("change", this.render, this);
    },

    render: function () {
        this.$el.empty();
        this.model.sort();
        _.forEach(this.model.models, this.renderItem, this);
        return this;
    },

    renderItem: function (model) {
        this.$el.append(new SortableItemView({
            model: model,
            orderField: this.orderField,
            template: this.itemTemplate,
            overClass: this.overClass,
            parent: this
        }).render().el);
    }

});
