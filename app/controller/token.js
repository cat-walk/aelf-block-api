/**
 * @file token.js
 * @author huangzongzhe
 * 2019.09
 */

const {
  Controller
} = require('egg');
const formatOutput = require('../utils/formatOutput.js');

const keysRule = {
  symbol: 'string',
  address: 'string',
  limit: 'number',
  page: 'number',
};

class TokenController extends Controller {

  // /**
  //  * 获取对应时间段的TPS信息
  //  * http://localhost:7101/api/tps/list?start_time=1543470081680&end_time=1543473081680
  //  *
  //  * @API getTransactions
  //  * @param {Number} start_time 毫秒级别
  //  * @param {Number} end_time 毫秒级别
  //  * @return {Object}
  //  */
  // create transfer issue crossChainTransfer crossChainReceive
  async getTxs() {
    const {
      ctx
    } = this;
    try {
      const {
        symbol,
        address,
        limit,
        page,
        order
      } = ctx.request.query;
      const options = {
        symbol: symbol || 'ELF',
        address,
        limit: parseInt(limit, 10) || 20,
        page: parseInt(page, 10) || 0,
        order: order || 'DESC'
      };
      ctx.validate(keysRule, options);

      const result = await ctx.service.token.getTxs(options);
      formatOutput(ctx, 'get', result);
    } catch (error) {
      formatOutput(ctx, 'error', error, 422);
    }
  }

  async getPrice() {
    const {
      ctx
    } = this;

    const keysRule = {
      fsym: 'string',
      tsyms: 'string'
    };

    try {
      const {
        fsym,
        tsyms
      } = ctx.request.query;

      const options = {
        fsym,
        tsyms
      };

      ctx.validate(keysRule, options);

      const result = await ctx.service.token.getPrice(options);

      formatOutput(ctx, 'get', result);
    } catch (error) {
      formatOutput(ctx, 'error', error, 422);
    }
  }

}

module.exports = TokenController;
