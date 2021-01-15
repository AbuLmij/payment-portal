<template>
	<div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
		<div class="vx-col sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0 m-4">
			<vx-card fixedHeight>
				<div slot="no-body" class="full-page-bg-color">
					<vs-row class="px-6" vs-w="12">
						<vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">
							<vs-input label="Name on Card" name="nameOnCard" v-model="nameOnCard" class="w-full mt-5"
									  v-validate="'required|alpha_spaces|max:255'" @click.stop=""/>
							<span class="text-danger w-full text-sm" v-show="errors.has('nameOnCard')">{{ errors.first("nameOnCard") }}</span>
						</vs-col>

						<vs-col vs-type="flex-end" vs-justify="flex-end" vs-align="flex-end" vs-w="12">
							<vs-input
									label="Card Number"
									name="cardNumber"
									v-model="cardNumber"
									class="w-full mt-5"
									icon="credit_card"
									v-validate="'required|digits:16'"
									@click.stop=""
							/>
							<span class="text-danger w-full text-sm" v-show="errors.has('cardNumber')">{{ errors.first("cardNumber") }}</span>
						</vs-col>

						<vs-col vs-type="flex-end" vs-justify="centern" vs-align="center" vs-w="6">
							<vs-input label="MMYYYY" name="cardExpiry" v-model="cardExpiry" class="w-full mt-5"
									  v-validate="'required|digits:6'" @click.stop=""/>
							<span class="text-danger w-full text-sm" v-show="errors.has('cardExpiry')">{{ errors.first("cardExpiry") }}</span>
						</vs-col>
						<vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="1"></vs-col>
						<vs-col vs-type="flex-end" vs-justify="center" vs-align="center" vs-w="5">
							<vs-input label="CVC" name="cardCVC" v-model="cardCVC" class="w-full mt-5"
									  icon="credit_card" v-validate="'required|digits:3'" @click.stop=""/>
							<span class="text-danger w-full text-sm" v-show="errors.has('cardCVC')">{{ errors.first("cardCVC") }}</span>
						</vs-col>

						<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
							<vs-button class="w-full my-5" @click.stop="submitCardForm">Pay
								<!--{{ cartData.order.total |-->
								<!--numeralFormat("$ 0,0.00") }}-->
							</vs-button>
						</vs-col>
					</vs-row>
				</div>
			</vx-card>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			nameOnCard: "",
			cardNumber: "",
			cardExpiry: "",
			cardCVC: "",
		};
	},
	methods: {
	},
};
</script>