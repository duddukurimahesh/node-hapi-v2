
/*------------------------------------------------------------------------
   * @ file        : logger.js
   * @ description : Here define the success and error logger function.
   * @ author      : Duddukuri Mahesh
   * @ date        :
------------------------------------------------------------------------*/

module.exports = {

	err_log : function(err_msg, data) {

		console.log('\x1b[31m'+`START-----------------------------------------------------------------------------------------\n\t\tError At   : ${err_msg}\n\t\tError Data : ${JSON.stringify(data)}\n-------------------------------------------------------------------------------------------END.`);
	},
	succ_log: function(succ_msg, data) {

		console.log('\x1b[32m'+'\r-------------------START-'+message+'--------------\n\r'+JSON.stringify(data)+'\r-------------------END-'+message+'--------------\n\r');
	}
	
}
