'use strict';

module.exports = {
    /**
     *
     * @param id
     * @param related : note that related should be an array
     * @returns {*}
     */
    getById: function (id, related) {
        if (related instanceof Array) {
            return this.forge().query({where: {id: id}}).fetch({withRelated: related});
        }
        return this.forge().query({where: {id: id}}).fetch();
    },
    getByField: function (field, value, status, related) {
        let condition = {};
        condition[field] = value;
        if (status) {
            condition.status = status;
        }
        if (related instanceof Array) {
            return this.forge().query({where: condition}).fetch({withRelated: related});
        }
        return this.forge().query({where: condition}).fetch();
    },
    getByFields: function (condition, related) {
        if (related instanceof Array) {
            return this.forge().query({where: condition}).fetch({withRelated: related});
        }
        return this.forge().query({where: condition}).fetch();
    },
    getByName: function (name, related) {
        if (related instanceof Array) {
            return this.forge().query({where: {name: name}}).fetch({withRelated: related});
        }
        return this.forge().query({where: {name: name}}).fetch();
    },
    getAllByFields: function (condition, related) {
        if (related instanceof Array) {
            return this.forge().query({where: condition}).fetchAll({withRelated: related});
        }
        return this.forge().query({where: condition}).fetchAll();
    },
    getAllByRawSql: function (select, condition) {
        return this.forge().query(function (qb) {
            if (select) {
                qb.select(select);
            }

            if (condition) {
                qb.whereRaw(condition)
            }

        }).fetchAll();
    },
    getAll: function (from, to, offset, limit, status, sort, order, select, options) {
        return this.forge().query(function (qb) {
            if (select) {
                qb.select(select);
            }
            if (from) {
                qb.whereRaw(`${from} >= DATE(created_at)`)
            }

            if (to) {
                qb.whereRaw(`${to} <= DATE(created_at)`)
            }

            if (status) {
                qb.where('status', '=', status)
            }

            if (options && !options.nullable) {
                qb.whereRaw(`${options.field} is not null`)
            }

            if (sort && order) {
                qb.orderBy(sort, order)
            } else if (sort && !order) {
                qb.orderBy(sort, 'asc')
            }else if (!sort && order) {
                qb.orderBy('created_at', order)
            }else {
                qb.orderBy('created_at', 'desc')
            }

            if ((offset === 0 || offset) && limit) {
                qb.offset(offset).limit(limit)
            }
        }).fetchAll();
    }
}