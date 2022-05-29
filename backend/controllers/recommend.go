package controllers

import (
	"context"
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/personalizeruntime"
)

func Recommend(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())

	var users = []string{
		"429",
		"107",
		"191",
		"210",
		"272",
		"514",
		"313",
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// Load the Shared AWS Configuration (~/.aws/config)
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	// Create an Amazon S3 service client
	client := personalizeruntime.NewFromConfig(cfg)

	var recommendInput personalizeruntime.GetRecommendationsInput
	var arn string = os.Getenv("PERSONALIZE_CAMPAIGN_ARN")
	var userId = users[rand.Intn(len(users))]

	recommendInput.CampaignArn = &arn
	recommendInput.UserId = &userId

	ctx := context.Background()

	recommendations, err := client.GetRecommendations(ctx, &recommendInput)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonBody, err := json.Marshal(recommendations)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(jsonBody)

	w.WriteHeader(http.StatusOK)
}
