using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineJudge.API.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SubmissionStatus2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status_ActualOutput",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_Error",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_Kind",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_TestCase_Input",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_TestCase_IsSample",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_TestCase_Key",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_TestCase_Output",
                table: "Submissions");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Submissions",
                type: "jsonb",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Submissions");

            migrationBuilder.AddColumn<string>(
                name: "Status_ActualOutput",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status_Error",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status_Kind",
                table: "Submissions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status_TestCase_Input",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status_TestCase_IsSample",
                table: "Submissions",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status_TestCase_Key",
                table: "Submissions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status_TestCase_Output",
                table: "Submissions",
                type: "text",
                nullable: true);
        }
    }
}
